import { allExercises } from "@/data/allExercises";
import { notFound } from "next/navigation";
import ExercisePlayer from "@/components/ExercisePlayer";

export default async function ExercisePage({
  params,
}: {
  params: { id: string };
}) {
  const exercise = allExercises[params.id as keyof typeof allExercises];

  if (!exercise) return notFound();

  return (
    <main className="min-h-screen">
      <ExercisePlayer exercise={exercise} />
    </main>
  );
}
