"use client";

import { useAccuracy } from "@/hooks/useAccuracy";
import { useProgress } from "@/hooks/useProgress";
import { useEffect, useState } from "react";
import StatisticsCard from "./StatisticsCard";

type StatisticsCardProps = {
  accuracy: number;
  levelsCompleted: number;
  streak: number;
};

export default function StatisticsCardContainer() {
  const { accuracy: accuracyData, loading: accuracyLoading } = useAccuracy();
  const { progress, loading: progressLoading } = useProgress();
  const [stats, setStats] = useState<StatisticsCardProps>({
    accuracy: 0,
    levelsCompleted: 0,
    streak: 0,
  });

  useEffect(() => {
    if (!accuracyLoading && !progressLoading) {
      // Calculate accuracy
      const overallAccuracy = accuracyData?.accuracy || 0;
      
      // Calculate completed exercises
      const completed = progress?.filter((p: any) => p.status === "completed").length || 0;
      
      const streak = 0; // Placeholder for now
      
      setStats({
        accuracy: Math.round(overallAccuracy),
        levelsCompleted: completed,
        streak: streak,
      });
    }
  }, [accuracyData, progress, accuracyLoading, progressLoading]);

  if (accuracyLoading || progressLoading) {
    // Show loading state or skeleton
    return (
      <div className="w-full max-w-xs rounded-2xl bg-[#1C1C3A] text-[#FFC0CB] p-4 shadow-md animate-pulse">
        <div className="h-6 bg-[#2C2C71] rounded w-24 mx-auto mb-4"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#2C2C71] rounded-xl h-20"></div>
          <div className="bg-[#2C2C71] rounded-xl h-20"></div>
          <div className="bg-[#2C2C71] rounded-xl h-20"></div>
        </div>
      </div>
    );
  }

  return (
    <StatisticsCard
      accuracy={stats.accuracy}
      levelsCompleted={stats.levelsCompleted}
      streak={stats.streak}
    />
  );
}