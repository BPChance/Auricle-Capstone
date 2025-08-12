"use client";

import { intervalExercises } from "@/data/intervalExercises";
import LessonRow from "@/components/LessonRow";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { useProgress } from "@/hooks/useProgress";
import { useEffect, useState } from "react";

type Lesson = {
  id: string;
  title: string;
  status: "locked" | "unlocked" | "completed";
};

export default function Intervals() {
  const { progress, loading, error } = useProgress("intervals");
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    if (!loading && progress) {
      const mappedLessons: Lesson[] = intervalExercises.map((exercise) => {
        const exerciseProgress = progress.find(p => p.exercise_id === exercise.id);
        
        let status: "locked" | "unlocked" | "completed" = "locked";
        
        if (exerciseProgress?.status === "completed") {
          status = "completed";
        } else if (exerciseProgress?.status === "unlocked" || exerciseProgress?.status === "in_progress") {
          status = "unlocked";
        }
        
        return {
          id: exercise.id,
          title: exercise.name,
          status: status,
        };
      });
      setLessons(mappedLessons);
    }
  }, [progress, loading]);

  if (loading) return <LoadingSpinner message="Loading exercises..." />;
  if (error) return <ErrorMessage message="Error loading exercises" />;

  const roadmap = [
    {
      id: "intervals-beginner",
      lessons: lessons,
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll p-8 bg-[#2C2C71] text-[#FFC0CB] space-y-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        Interval Training Roadmap
      </h1>

      {roadmap.map((section) => (
        <LessonRow key={section.id} lessons={section.lessons} />
      ))}
    </div>
  );
}