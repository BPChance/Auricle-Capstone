"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { ProfileHeader } from "@/components/ProfileHeader";
import { NotLoggedIn } from "@/components/NotLoggedIn";

export default function ProfileStatsPage() {
  const router = useRouter();
  const { session } = useAuth();
  
  const user = session?.user;
  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || '';
  const loading = false;

  if (!session) {
    return <NotLoggedIn onLoginClick={() => router.push('/login')} />;
  }

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
          <h2 className="text-sm text-gray-400 mb-3">Statistics</h2>
        </div>
      </div>
    </div>
  );
}