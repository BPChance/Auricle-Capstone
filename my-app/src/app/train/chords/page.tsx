import { chordExercises } from "@/data/ChordExercises";
import LessonRow from "@/components/LessonRow";

export default function Chords() {
  const roadmap = [
    {
      id: "chords-beginner",
      lessons: chordExercises.map((ex) => ({
        id: ex.id,
        title: ex.name,
        status: "unlocked" as const, // still needs logic for locked/completed
      })),
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll p-8 bg-[#2C2C71] text-[#FFC0CB] space-y-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        Chord Training Roadmap
      </h1>

      {roadmap.map((section) => (
        <LessonRow key={section.id} lessons={section.lessons} />
      ))}
    </div>
  );
}
