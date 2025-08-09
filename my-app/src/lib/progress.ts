import { supabase } from "./supabaseClient";

type TrackExerciseArgs = {
  userId: string;
  exerciseId: string;
  correct: number;
  attempted: number;
};

export async function updateUserStatistics(userId: string) {
  const { data: allProgress, error } = await supabase
    .from("exercise_progress")
    .select("correct, attempted")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user progress:", error.message);
    return;
  }

  const totalCorrect = allProgress.reduce((sum, ex) => sum + ex.correct, 0);
  const totalAttempted = allProgress.reduce((sum, ex) => sum + ex.attempted, 0);
  const levelsCompleted = allProgress.filter((ex) => ex.attempted > 0).length;

  const accuracy =
    totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

  const { error: statsError } = await supabase.from("user_statistics").upsert(
    [
      {
        user_id: userId,
        accuracy,
        levels_completed: levelsCompleted,
      },
    ],
    { onConflict: "user_id" }
  );

  if (statsError) {
    console.error("Error updating statistics:", statsError.message);
  }
}

export async function trackExerciseProgress({
  userId,
  exerciseId,
  correct,
  attempted,
}: TrackExerciseArgs) {
  const { data, error } = await supabase.from("exercise_progress").upsert(
    [
      {
        user_id: userId,
        exercise_id: exerciseId,
        correct,
        attempted,
        completed_at: new Date().toISOString(),
      },
    ],
    { onConflict: "user_id,exercise_id" }
  );

  if (error) {
    console.error("Error saving progress:", error.message);
  }

  await updateUserStatistics(userId);

  return data;
}
