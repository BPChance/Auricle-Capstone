export type ExerciseStep = {
  level:
    | "Remember"
    | "Understand"
    | "Apply"
    | "Analyze"
    | "Evaluate"
    | "Create";
  type: "multipleChoice" | "match" | "audioOnly";
  question: string;
  audio: string;
  options: string[];
  answer: string;
};

export type Exercise = {
  id: string;
  name: string;
  steps: ExerciseStep[];
};

export const chordExercises: Exercise[] = [
  {
    id: "chord-1",
    name: "Major vs Minor (C)",
    steps: [
      {
        level: "Remember",
        type: "multipleChoice",
        question: "Is this chord major or minor?",
        audio: "Cmaj",
        options: ["Major", "Minor"],
        answer: "Major",
      },
      {
        level: "Understand",
        type: "match",
        question: "Which mood fits this chord best?",
        audio: "Cmaj",
        options: ["Happy", "Sad", "Dark"],
        answer: "Happy",
      },
      {
        level: "Apply",
        type: "multipleChoice",
        question: "Which chord matches this audio?",
        audio: "Cmaj",
        options: ["C major", "C minor", "G major"],
        answer: "C major",
      },
    ],
  },
];
