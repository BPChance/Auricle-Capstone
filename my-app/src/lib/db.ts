import { supabase } from "./supabaseClient";

// ============== TYPE DEFINITIONS ==============
export type ExerciseProgress = {
  id: string;
  user_id: string;
  exercise_id: string;
  category: "notes" | "chords" | "intervals";
  status: "locked" | "unlocked" | "in_progress" | "completed";
  current_step: number;
  completed_steps: number;
  total_steps: number;
  attempts: number;
  correct_answers: number;
  last_attempted?: string;
  completed_at?: string;
};

export type StepProgress = {
  id: string;
  user_id: string;
  exercise_id: string;
  step_index: number;
  is_completed: boolean;
  attempts: number;
  last_answer?: string;
  completed_at?: string;
};

export type UserProfile = {
  id: string;
  username?: string;
  created_at?: string;
  updated_at?: string;
};

export type AccuracyStats = {
  totalAttempts: number;
  correctAnswers: number;
  accuracy: number;
  byCategory: {
    notes: { attempts: number; correct: number; accuracy: number };
    intervals: { attempts: number; correct: number; accuracy: number };
    chords: { attempts: number; correct: number; accuracy: number };
  };
  recentExercises: {
    exercise_id: string;
    category: string;
    attempts: number;
    correct: number;
    accuracy: number;
  }[];
};

// ============== USER PROFILE OPERATIONS ==============
export const userProfile = {
  async get(userId: string) {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }

    return data as UserProfile;
  }
};

// ============== EXERCISE PROGRESS OPERATIONS ==============
export const exerciseProgress = {
  async getByCategory(userId: string, category: "notes" | "chords" | "intervals") {
    const { data, error } = await supabase
      .from("exercise_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("category", category)
      .order("exercise_id");

    if (error) {
      console.error("Error fetching category progress:", error);
      return [];
    }

    return data as ExerciseProgress[];
  },

  async getOne(userId: string, exerciseId: string) {
    const { data, error } = await supabase
      .from("exercise_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("exercise_id", exerciseId)
      .single();

    if (error) {
      console.error("Error fetching exercise progress:", error);
      return null;
    }

    return data as ExerciseProgress;
  },

  async update(userId: string, exerciseId: string, updates: Partial<ExerciseProgress>) {
    const { data, error } = await supabase
      .from("exercise_progress")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)
      .eq("exercise_id", exerciseId)
      .select()
      .single();

    if (error) {
      console.error("Error updating exercise progress:", error);
      return null;
    }

    return data as ExerciseProgress;
  },

  async start(userId: string, exerciseId: string) {
    const current = await this.getOne(userId, exerciseId);
    
    return this.update(userId, exerciseId, {
      status: "in_progress",
      last_attempted: new Date().toISOString(),
    });
  },

  async complete(userId: string, exerciseId: string, category: string) {
    // Mark as completed
    await this.update(userId, exerciseId, {
      status: "completed",
      completed_at: new Date().toISOString(),
    });

    // Unlock next exercise
    await this.unlockNext(userId, exerciseId, category);
  },

  async unlockNext(userId: string, currentExerciseId: string, category: string) {
    const match = currentExerciseId.match(/(\w+)-(\d+)/);
    if (!match) return;

    const [, prefix, num] = match;
    const nextNum = parseInt(num) + 1;
    const nextExerciseId = `${prefix}-${nextNum}`;

    const { error } = await supabase
      .from("exercise_progress")
      .update({ status: "unlocked" })
      .eq("user_id", userId)
      .eq("exercise_id", nextExerciseId)
      .eq("status", "locked");

    if (error) {
      console.error("Error unlocking next exercise:", error);
    }
  },

  // Track answer accuracy
  async recordAnswer(userId: string, exerciseId: string, isCorrect: boolean) {
    const current = await this.getOne(userId, exerciseId);
    if (!current) return null;

    const newAttempts = (current.attempts || 0) + 1;
    const newCorrect = (current.correct_answers || 0) + (isCorrect ? 1 : 0);

    return this.update(userId, exerciseId, {
      attempts: newAttempts,
      correct_answers: newCorrect,
    });
  },

  // Get accuracy for an exercise
  async getAccuracy(userId: string, exerciseId: string) {
    const progress = await this.getOne(userId, exerciseId);
    if (!progress || !progress.attempts) return 0;
    
    return (progress.correct_answers / progress.attempts) * 100;
  }
};

// ============== STEP PROGRESS OPERATIONS ==============
export const stepProgress = {
  async save(
    userId: string,
    exerciseId: string,
    stepIndex: number,
    isCompleted: boolean,
    answer?: string
  ) {
    // Get current attempts
    const { data: existing } = await supabase
      .from("step_progress")
      .select("attempts")
      .eq("user_id", userId)
      .eq("exercise_id", exerciseId)
      .eq("step_index", stepIndex)
      .single();

    const attempts = (existing?.attempts || 0) + 1;

    const { data, error } = await supabase
      .from("step_progress")
      .upsert({
        user_id: userId,
        exercise_id: exerciseId,
        step_index: stepIndex,
        is_completed: isCompleted,
        last_answer: answer,
        completed_at: isCompleted ? new Date().toISOString() : null,
        attempts,
      })
      .select()
      .single();

    if (error) {
      console.error("Error saving step progress:", error);
      return null;
    }

    // Update completed steps count
    if (isCompleted) {
      const completedCount = await this.getCompletedCount(userId, exerciseId);
      await exerciseProgress.update(userId, exerciseId, {
        completed_steps: completedCount,
        current_step: stepIndex + 1,
      });
    }

    // Also record the answer for accuracy tracking
    await exerciseProgress.recordAnswer(userId, exerciseId, isCompleted);

    return data as StepProgress;
  },

  async getCompletedCount(userId: string, exerciseId: string) {
    const { count, error } = await supabase
      .from("step_progress")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("exercise_id", exerciseId)
      .eq("is_completed", true);

    if (error) {
      console.error("Error counting completed steps:", error);
      return 0;
    }

    return count || 0;
  }
};

// ============== ACCURACY STATS ==============
export const accuracy = {
  async getUserAccuracy(userId: string): Promise<AccuracyStats> {
    // Get all exercise progress
    const { data: exercises, error } = await supabase
      .from("exercise_progress")
      .select("*")
      .eq("user_id", userId)
      .gt("attempts", 0); // Only exercises with attempts

    if (error || !exercises) {
      console.error("Error fetching accuracy data:", error);
      return {
        totalAttempts: 0,
        correctAnswers: 0,
        accuracy: 0,
        byCategory: {
          notes: { attempts: 0, correct: 0, accuracy: 0 },
          intervals: { attempts: 0, correct: 0, accuracy: 0 },
          chords: { attempts: 0, correct: 0, accuracy: 0 },
        },
        recentExercises: [],
      };
    }

    // Calculate totals
    let totalAttempts = 0;
    let totalCorrect = 0;
    const byCategory = {
      notes: { attempts: 0, correct: 0, accuracy: 0 },
      intervals: { attempts: 0, correct: 0, accuracy: 0 },
      chords: { attempts: 0, correct: 0, accuracy: 0 },
    };

    exercises.forEach((ex) => {
      totalAttempts += ex.attempts || 0;
      totalCorrect += ex.correct_answers || 0;

      // Type-safe way to update category stats
      const category = ex.category as keyof typeof byCategory;
      if (category in byCategory) {
        byCategory[category].attempts += ex.attempts || 0;
        byCategory[category].correct += ex.correct_answers || 0;
      }
    });

    // Calculate accuracy percentages
    const overallAccuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;
    
    // Calculate accuracy for each category
    (Object.keys(byCategory) as Array<keyof typeof byCategory>).forEach((cat) => {
      const category = byCategory[cat];
      category.accuracy = category.attempts > 0 
        ? (category.correct / category.attempts) * 100 
        : 0;
    });

    // Get recent exercises with accuracy
    const recentExercises = exercises
      .filter(ex => ex.last_attempted)
      .sort((a, b) => new Date(b.last_attempted!).getTime() - new Date(a.last_attempted!).getTime())
      .slice(0, 10)
      .map(ex => ({
        exercise_id: ex.exercise_id,
        category: ex.category,
        attempts: ex.attempts || 0,
        correct: ex.correct_answers || 0,
        accuracy: ex.attempts ? ((ex.correct_answers || 0) / ex.attempts) * 100 : 0,
      }));

    return {
      totalAttempts,
      correctAnswers: totalCorrect,
      accuracy: overallAccuracy,
      byCategory,
      recentExercises,
    };
  },

  async getCategoryAccuracy(userId: string, category: "notes" | "chords" | "intervals") {
    const exercises = await exerciseProgress.getByCategory(userId, category);
    
    let totalAttempts = 0;
    let totalCorrect = 0;

    exercises.forEach(ex => {
      totalAttempts += ex.attempts || 0;
      totalCorrect += ex.correct_answers || 0;
    });

    return {
      attempts: totalAttempts,
      correct: totalCorrect,
      accuracy: totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0,
      exercises: exercises.map(ex => ({
        id: ex.exercise_id,
        attempts: ex.attempts || 0,
        correct: ex.correct_answers || 0,
        accuracy: ex.attempts ? ((ex.correct_answers || 0) / ex.attempts) * 100 : 0,
      })),
    };
  }
};

// ============== INITIALIZATION ==============
export const db = {
  async initializeUser(userId: string) {
    const { error } = await supabase.rpc("initialize_user_exercises", {
      p_user_id: userId,
    });

    if (error) {
      console.error("Error initializing user exercises:", error);
    }
  },

  async getUserStats(userId: string) {
    const [profile, accuracyStats] = await Promise.all([
      userProfile.get(userId),
      accuracy.getUserAccuracy(userId),
    ]);

    return {
      profile,
      accuracy: accuracyStats,
    };
  }
};

// Export everything for easy access
export default {
  user: userProfile,
  exercise: exerciseProgress,
  step: stepProgress,
  accuracy: accuracy,
  init: db.initializeUser,
  stats: db.getUserStats,
};