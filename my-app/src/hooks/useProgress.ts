import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import db, { ExerciseProgress } from "@/lib/db";

export function useProgress(category?: "notes" | "chords" | "intervals") {
  const { session } = useAuth();
  const [progress, setProgress] = useState<ExerciseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = session?.user?.id;

  const fetchCategoryProgress = useCallback(async () => {
    if (!userId || !category) return;

    setLoading(true);
    setError(null);

    try {
      const data = await db.exercise.getByCategory(userId, category);
      setProgress(data);
    } catch (err) {
      setError("Failed to fetch progress");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId, category]);

  const fetchAllProgress = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    setError(null);

    try {
      const [notes, intervals, chords] = await Promise.all([
        db.exercise.getByCategory(userId, "notes"),
        db.exercise.getByCategory(userId, "intervals"),
        db.exercise.getByCategory(userId, "chords"),
      ]);
      
      setProgress([...notes, ...intervals, ...chords]);
    } catch (err) {
      setError("Failed to fetch progress");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (category) {
      fetchCategoryProgress();
    } else {
      fetchAllProgress();
    }
  }, [category, fetchCategoryProgress, fetchAllProgress]);

  return {
    progress,
    loading,
    error,
    refetch: category ? fetchCategoryProgress : fetchAllProgress,
  };
}

export function useExerciseProgress(exerciseId: string) {
  const { session } = useAuth();
  const [progress, setProgress] = useState<ExerciseProgress | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id;

  const fetchProgress = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const data = await db.exercise.getOne(userId, exerciseId);
      setProgress(data);
    } catch (err) {
      console.error("Failed to fetch exercise progress:", err);
    } finally {
      setLoading(false);
    }
  }, [userId, exerciseId]);

  const startExercise = useCallback(async () => {
    if (!userId) return;
    
    const updated = await db.exercise.start(userId, exerciseId);
    if (updated) setProgress(updated);
  }, [userId, exerciseId]);

  const completeExercise = useCallback(async (category: string) => {
    if (!userId) return;
    
    await db.exercise.complete(userId, exerciseId, category);
    await fetchProgress();
  }, [userId, exerciseId, fetchProgress]);

  const saveStepProgress = useCallback(async (
    stepIndex: number,
    isCompleted: boolean,
    answer?: string
  ) => {
    if (!userId) return;
    
    await db.step.save(userId, exerciseId, stepIndex, isCompleted, answer);
    await fetchProgress();
  }, [userId, exerciseId, fetchProgress]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    progress,
    loading,
    startExercise,
    completeExercise,
    saveStepProgress,
    refetch: fetchProgress,
  };
}

export function useUserStats() {
  const { session } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userId = session?.user?.id;

  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) return;

      setLoading(true);
      try {
        const data = await db.stats(userId);
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch user stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  return { stats, loading };
}