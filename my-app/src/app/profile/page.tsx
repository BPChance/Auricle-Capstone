"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { ProfileHeader } from "@/components/ProfileHeader";
import { NotLoggedIn } from "@/components/NotLoggedIn";
import { Music } from "lucide-react";
import StatisticsCardContainer from "@/components/StatisticsCardContainer";
import { useProgress } from "@/hooks/useProgress";

export default function ProfileStatsPage() {
  const router = useRouter();
  const { session } = useAuth();
  const { progress } = useProgress();
  
  const user = session?.user;
  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || '';
  const loading = false;

  if (!session) {
    return <NotLoggedIn onLoginClick={() => router.push('/login')} />;
  }

  // Calculate overall progress
  const completed = progress?.filter(p => p.status === "completed").length || 0;
  const total = progress?.length || 0;
  const progressPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#2C2C71] text-white p-8">
      <div className="max-w-2xl">
        <ProfileHeader 
          username={username} 
          email={user?.email}
          loading={loading} 
        />

        {/* Statistics Section */}
        <div className="mb-6">
          
          <div className="mb-6">
            <StatisticsCardContainer />
          </div>

          {/* Progress Bar */}
          <div className="bg-[#4848A1] rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Overall Progress</span>
              <span className="text-xs text-gray-400">
                {completed} / {total} exercises
              </span>
            </div>
            <div className="w-full bg-[#3A3A7F] rounded-full h-2">
              <div 
                className="bg-[#FFC0CB] h-2 rounded-full transition-all duration-300" 
                style={{width: `${progressPercentage}%`}}
              />
            </div>
          </div>
        </div>

        {/* Exercise Section */}
        <div className="bg-[#4848A1] rounded-lg p-8">
          <div className="flex items-center justify-center gap-4">
            <Music className="w-12 h-12 text-[#FFC0CB]" />
            <button 
              onClick={() => router.push('/train')}
              className="text-[#FFC0CB] hover:text-white transition-colors"
            >
              {progress?.some(p => p.status === "in_progress") 
                ? "Resume Exercise" 
                : "Start Training"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}