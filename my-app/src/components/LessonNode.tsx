"use client";

import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

type Props = {
  id: string;
  title: string;
  status: "locked" | "unlocked" | "completed";
};

export default function LessonNode({ id, title, status }: Props) {
  const router = useRouter();
  const isLocked = status === "locked";

  const handleClick = () => {
    if (!isLocked) {
      router.push(`/exercise/${id}`);
    }
  };

  return (
    <div
      className="group flex flex-col items-center space-y-1"
      onClick={handleClick}
    >
      <div
        className={`w-24 h-24 flex items-center justify-center rounded-full text-xl font-bold
        border-2 border-[#FFC0CB] transition-all duration-200 ease-in-out
        shadow-lg hover:shadow-[0_0_20px_4px_rgba(255,192,203,0.4)]
        ${
          isLocked
            ? "bg-gray-600 text-white cursor-not-allowed"
            : "bg-gradient-to-br from-[#5a5ac1] to-[#3a3a90] text-[#FFC0CB] cursor-pointer hover:scale-105"
        }`}
      >
        {isLocked ? <Lock className="w-6 h-6" /> : title[0]}
      </div>

      <span
        className="opacity-0 group-hover:opacity-100 transition duration-200 
        px-2 py-1 bg-[#2C2C71] text-[#FFC0CB] rounded-md text-xs shadow-md"
      >
        {title}
      </span>
    </div>
  );
}
