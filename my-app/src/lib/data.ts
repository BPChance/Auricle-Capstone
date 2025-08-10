import { supabase } from "@/lib/supabaseClient";

export async function fetchUserStats(userId: string) {
  const { data, error } = await supabase
    .from("exercise_progress")
    .select("correct, attempted")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching stats:", error.message);
    return null;
  }

  if (!data || data.length === 0) {
    return {
      accuracy: 0,
      levels_completed: 0,
      streak: 0,
    };
  }

  const totalCorrect = data.reduce((sum, item) => sum + (item.correct || 0), 0);
  const totalAttempted = data.reduce(
    (sum, item) => sum + (item.attempted || 0),
    0
  );

  const accuracy =
    totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;
  const levelsCompleted = data.length;

  return {
    accuracy,
    levels_completed: levelsCompleted,
    streak: 0, // placeholder for streak, add locally later
  };
}
