"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { fetchUserStats } from "@/lib/data";
import { noteExercises } from "@/data/noteExercises";
import LessonRow from "@/components/LessonRow";
import StatisticsCard from "@/components/StatisticsCard";

export default function Notes() {
  const { session } = useAuth();
  const [stats, setStats] = useState<{
    accuracy: number;
    levels_completed: number;
    streak: number;
  } | null>(null);

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserStats(session.user.id).then(setStats);
    }
  }, [session]);

  const roadmap = [
    {
      id: "notes-beginner",
      lessons: noteExercises.map((ex) => ({
        id: ex.id,
        title: ex.name,
        status: "unlocked" as const,
      })),
    },
  ];

  return (
    <div className="h-screen overflow-y-scroll p-8 bg-[#2C2C71] text-[#FFC0CB] space-y-16">
      <h1 className="text-3xl font-bold text-center mb-8">
        Note Training Roadmap
      </h1>

      {stats ? (
        <StatisticsCard
          accuracy={stats.accuracy}
          levelsCompleted={stats.levels_completed}
          streak={stats.streak}
        />
      ) : (
        <StatisticsCard accuracy={0} levelsCompleted={0} streak={0} />
      )}

      {roadmap.map((section) => (
        <LessonRow key={section.id} lessons={section.lessons} />
      ))}
    </div>
  );
}
