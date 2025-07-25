import ExercisePlayer from "@/components/ExercisePlayer";

export default function Chords() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Chords Page</h1>
      <p className="text-lg">
        This is the chords training page of the application.
      </p>
      <p className="mt-2 text-gray-600">
        You can add your chords training logic here.
      </p>
      <div className="mt-6">
        <ExercisePlayer />
      </div>
    </div>
  );
}
