"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AudioLines, Music, Loader2 } from "lucide-react";
import { useExerciseProgress } from "@/hooks/useProgress";

type ExerciseStep = {
  level: string;
  type: string;
  question: string;
  context?: string;
  audio: string;
  audio2?: string;
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
  const {
    progress,
    loading,
    startExercise,
    completeExercise,
    saveStepProgress,
  } = useExerciseProgress(exercise.id);

  const [stepIndex, setStepIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize step index from saved progress
  useEffect(() => {
    if (!loading && progress && !isInitialized) {
      setStepIndex(progress.current_step || 0);
      setIsInitialized(true);

      // Mark exercise as started if it's the first attempt
      if (progress.status === "unlocked") {
        startExercise();
      }
    }
  }, [progress, loading, isInitialized, startExercise]);

  const step = exercise.steps[stepIndex] ?? null;
  const isLastStep = stepIndex === exercise.steps.length - 1;
  const isCorrect = selected === step?.answer;

  const playNote = async () => {
    const Tone = await import("tone");
    await Tone.start();
    const synth = new Tone.Synth().toDestination();

    if (step) {
      const notes = step.audio.split(",");
      for (const note of notes) {
        synth.triggerAttackRelease(note, "8n");
        await new Promise((res) => setTimeout(res, 500));
      }
    }
  };

  const playDualAudio = async (audio: string) => {
    const Tone = await import("tone");
    await Tone.start();
    const synth = new Tone.Synth().toDestination();

    const notes = audio.split(",");
    for (const note of notes) {
      synth.triggerAttackRelease(note, "8n");
      await new Promise((res) => setTimeout(res, 500));
    }
  };

  const handleCheck = async () => {
    if (selected !== null && step) {
      setShowFeedback(true);

      // Calculate if answer is correct right when checking
      const answerIsCorrect = selected === step.answer;

      // Debug logging to see what's being compared
      console.log("Answer check:", {
        selected: selected,
        expectedAnswer: step.answer,
        isCorrect: answerIsCorrect,
        stepIndex: stepIndex,
      });

      // Save step progress with the correct boolean
      await saveStepProgress(stepIndex, answerIsCorrect, selected);

      // If this is the last step and it's correct, complete the exercise
      if (answerIsCorrect && isLastStep) {
        await completeExercise(exercise.category);
      }
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

    // play only if opt is a valid note
    if (/^[A-G]#?$/.test(opt)) {
      synth.triggerAttackRelease(opt + "4", "8n");
    }
  };

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

  // Show loading state while fetching progress
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#4848A1] text-[#FFC0CB]">
        <Loader2 className="animate-spin w-8 h-8" />
        <p className="mt-4">Loading progress...</p>
      </div>
    );
  }

  // Check if exercise is locked
  if (progress?.status === "locked") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#4848A1] text-[#FFC0CB] space-y-6">
        <p className="text-2xl font-bold">Exercise Locked</p>
        <p>Complete previous exercises to unlock this one.</p>
        <Link
          href={`/train/${exercise.category}`}
          className="border border-pink-400 px-6 py-2 rounded-md font-bold"
        >
          Back to Training
        </Link>
      </div>
    );
  }

  // When we're past the last step, show completion screen with Restart
  if (stepIndex >= exercise.steps.length) {
    const handleRestart = async () => {
      // Reset UI state first
      setSelected(null);
      setShowFeedback(false);
      setStepIndex(0);

      // Small delay to ensure state is reset before tracking
      setTimeout(() => {
        startExercise(); // Track restart in database
      }, 100);
    };

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#2C2C71] text-[#FFC0CB] space-y-6 px-4">
        <div className="text-center space-y-3">
          <p className="text-3xl font-bold">Exercise Complete!</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleRestart}
            className="border-2 border-[#FFC0CB] px-6 py-3 rounded-md font-bold 
                      hover:bg-[#FFC0CB] hover:text-[#2C2C71] transition"
          >
            Retry
          </button>

          <Link
            href={`/train/${exercise.category}`}
            className="border-2 border-[#FFC0CB] px-6 py-3 rounded-md font-bold 
                      hover:bg-[#FFC0CB] hover:text-[#2C2C71] transition"
          >
            Back to Training
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2C2C71] text-[#FFC0CB] px-4 py-8 space-y-8">
      {/* Progress indicator */}
      <div className="w-full max-w-md">
        <div className="flex justify-between text-sm mb-2">
          <span>
            Step {stepIndex + 1} of {exercise.steps.length}
          </span>
          <span>
            {Math.round(((stepIndex + 1) / exercise.steps.length) * 100)}%
            Complete
          </span>
        </div>
        <div className="w-full bg-[#1C1C3A] rounded-full h-2">
          <div
            className="bg-[#FFC0CB] h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((stepIndex + 1) / exercise.steps.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold">{step.level}</h2>

      <div className="flex flex-col items-center gap-3">
        <div className="w-20 h-20 border-2 border-[#FFC0CB] rounded-full flex items-center justify-center text-3xl bg-[#4848A1]">
          <Music className="text-[#FFC0CB] w-10 h-10 flex justify-center items-center mr-1" />
        </div>
        {step.type === "scaleContext" && step.scaleAudio && (
          <div className="flex flex-row items-center gap-3">
            <button
              onClick={playScale}
              className="flex items-center gap-2 text-sm font-semibold bg-[#4848A1] px-4 py-2 rounded-lg"
            >
              Play Scale
            </button>
            <div>{step.scaleAudio}</div>
          </div>
        )}

        {step.type === "dualAudio" ? (
          <div className="flex gap-4">
            <button
              onClick={() => playDualAudio(step.audio)}
              className="flex items-center gap-2 text-sm font-semibold bg-[#4848A1] px-4 py-2 rounded-lg"
            >
              1st
            </button>
            <button
              onClick={() => playDualAudio(step.audio2!)}
              className="flex items-center gap-2 text-sm font-semibold bg-[#4848A1] px-4 py-2 rounded-lg"
            >
              2nd
            </button>
          </div>
        ) : (
          <div
            onClick={playNote}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-12 h-10 rounded-md bg-[#4848A1] flex items-center justify-center transition-colors group-hover:bg-[#1C1C3A]">
              <AudioLines className="text-[#FFC0CB]" />
            </div>
            <span className="font-semibold text-sm">Play audio</span>
          </div>
        )}
        {step.context && (
          <div className="bg-[#1C1C3A] p-3 rounded-md text-sm text-[#FFC0CB] text-center max-w-md">
            {Array.isArray(step.context)
              ? step.context.join(" • ")
              : step.context}
          </div>
        )}

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
          <button
            onClick={() => {
              if (!isLastStep) {
                handleNext();
              } else {
                // Move to completion screen
                setStepIndex(stepIndex + 1);
              }
            }}
            className="border border-[#FFC0CB] px-6 py-2 rounded-md"
          >
            {isLastStep ? "Complete Exercise" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
