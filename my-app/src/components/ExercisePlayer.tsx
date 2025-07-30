"use client";

import { useState } from "react";
import Link from "next/link";
import { AudioLines } from "lucide-react";
import { Music } from "lucide-react";

type ExerciseStep = {
  level: string;
  type: string;
  question: string;
  audio: string;
  options: string[];
  answer: string;
  scaleAudio?: string[];
};

type Exercise = {
  id: string;
  name: string;
  steps: ExerciseStep[];
  category: "notes" | "chords" | "intervals";
};

type Props = {
  exercise: Exercise;
};

export default function ExercisePlayer({ exercise }: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const step = exercise.steps[stepIndex] ?? null;
  const isLastStep = stepIndex === exercise.steps.length - 1;
  const isCorrect = selected === step?.answer;

  const playNote = async () => {
    const Tone = await import("tone");
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    if (step) {
      synth.triggerAttackRelease(step.audio, "8n");
    }
  };

  const handleCheck = () => {
    if (selected !== null) {
      setShowFeedback(true);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setShowFeedback(false);
    setStepIndex((prev) => prev + 1);
  };

  const handleOptionClick = async (opt: string) => {
    const Tone = await import("tone");
    setSelected(opt);
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(opt + "4", "8n");
  };

  if (!step) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0D0E52] text-[#FFC0CB] space-y-6">
        <p className="text-2xl font-bold">Exercise Complete!</p>
        <Link
          href={`/train/${exercise.category}`}
          className="border border-pink-400 px-6 py-2 rounded-md font-bold"
        >
          Done
        </Link>
      </div>
    );
  }

  const playScale = async () => {
    if (!step?.scaleAudio) return;
    const Tone = await import("tone");
    await Tone.start();
    const synth = new Tone.Synth().toDestination();

    for (const note of step.scaleAudio) {
      synth.triggerAttackRelease(note, "8n");
      await new Promise((res) => setTimeout(res, 400));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2C2C71] text-[#FFC0CB] px-4 py-8 space-y-8">
      <h2 className="text-2xl font-bold">{step.level}</h2>

      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 border-2 border-[#FFC0CB] rounded-full flex items-center justify-center text-3xl bg-[#4848A1]">
          <Music className="text-[#FFC0CB] w-10 h-10 flex justify-center items-center mr-1" />
        </div>
        {step.type === "scaleContext" && step.scaleAudio && (
          <button
            onClick={playScale}
            className="flex items-center gap-2 text-sm font-semibold bg-[#2A2EBB] px-4 py-2 rounded-full"
          >
            Play Scale
          </button>
        )}

        <div
          onClick={playNote}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-12 h-10 rounded-md bg-[#4848A1] flex items-center justify-center transition-colors group-hover:bg-[#1C1C3A]">
            <AudioLines className="text-[#FFC0CB]" />
          </div>
          <span className="font-semibold text-sm">Play audio</span>
        </div>

        <p className="text-lg font-medium text-center mt-2">{step.question}</p>
      </div>

      <div className="space-y-4 w-full max-w-md">
        {step.options.map((opt, i) => {
          const isSelected = selected === opt;
          const isWrong = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={opt}
              onClick={() => handleOptionClick(opt)}
              className={`w-full py-3 px-6 rounded-full text-left font-medium transition bg-[#4848A1] shadow-xl
                ${isSelected ? "border-2 border-[#FFC0CB]" : ""}
                ${
                  isWrong
                    ? "bg-red-400 text-[#FFC0CB]"
                    : "bg-[#2A2EBB] text-[#FFC0CB]"
                }
                ${
                  isCorrect && showFeedback && isSelected
                    ? "bg-green-400 text-[#FFC0CB]"
                    : ""
                }
              `}
              disabled={showFeedback}
            >
              {i + 1}. {opt}
            </button>
          );
        })}
      </div>

      {!showFeedback && (
        <div className="flex justify-end w-full max-w-md">
          <button
            onClick={handleCheck}
            className="mt-4 border border-[#FFC0CB] px-6 py-2 rounded-md font-bold disabled:opacity-50"
            disabled={!selected}
          >
            Check
          </button>
        </div>
      )}

      {showFeedback && !isCorrect && (
        <div className="space-y-3 mt-4 text-center">
          <p className="text-red-400 font-semibold">Incorrect. Try again.</p>
          <button
            onClick={() => {
              setSelected(null);
              setShowFeedback(false);
            }}
            className="border border-[#FFC0CB] px-6 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      )}

      {showFeedback && isCorrect && (
        <div className="space-y-3 mt-4 text-center">
          <p className="text-green-400 font-semibold">Correct!</p>
          {!isLastStep ? (
            <button
              onClick={handleNext}
              className="border border-[#FFC0CB] px-6 py-2 rounded-md"
            >
              Next
            </button>
          ) : (
            <Link
              href={`/train/${exercise.category}`}
              className="border border-[#FFC0CB] px-6 py-2 rounded-md inline-block"
            >
              Done
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
