export type ExerciseStep = {
  level:
    | "Remember"
    | "Understand"
    | "Apply"
    | "Analyze"
    | "Evaluate"
    | "Create";
  type: "multipleChoice" | "match" | "audioOnly" | "scaleContext";
  question: string;
  audio: string;
  options: string[];
  answer: string;
  scaleAudio?: string[];
};

export type Exercise = {
  id: string;
  name: string;
  steps: ExerciseStep[];
  category: "notes" | "chords" | "intervals";
};
