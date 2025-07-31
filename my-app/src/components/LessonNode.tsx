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

  const handleClick = () => {
    if (status !== "locked") {
      router.push(`/exercise/${id}`);
    }
  };

  const isLocked = status === "locked";

  return (
    <div
      className="group flex flex-col items-center space-y-1"
      onClick={handleClick}
    >
      <div
        className={`w-20 h-20 flex items-center justify-center rounded-full 
        shadow-md transition duration-200 border-2 border-[#FFC0CB]
        ${
          isLocked
            ? "bg-gray-600 text-white cursor-not-allowed"
            : "bg-[#4848A1] text-[#FFC0CB] hover:bg-[#5a5ac1] cursor-pointer"
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
