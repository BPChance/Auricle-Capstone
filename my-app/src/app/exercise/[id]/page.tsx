import { allExercises } from "@/data/allExercises";
import { notFound } from "next/navigation";
import ExercisePlayer from "@/components/ExercisePlayer";

type Props = {
  params: { id: string };
};

export default async function ExercisePage({ params }: Props) {
  const exercise = allExercises[params.id as keyof typeof allExercises];

  if (!exercise) return notFound();

  return (
    <main className="min-h-screen">
      <ExercisePlayer exercise={exercise} />
    </main>
  );
}
