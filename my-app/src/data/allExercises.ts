import { chordExercises } from "./chordExercises";
import { intervalExercises } from "./intervalExercises";
import { noteExercises } from "./noteExercises";

export const allExercises = Object.fromEntries(
  [...chordExercises, ...intervalExercises, ...noteExercises].map(
    (exercise) => [exercise.id, exercise]
  )
);
