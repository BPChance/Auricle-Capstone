"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { UserRound } from "lucide-react";
import { Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-32 flex flex-col items-center min-h-screen bg-[#1C1C3A] text-[#FFC0CB] p-8">
      <Link href={"/train"}>
        <h2 className="text-xl font-bold mb-8">Auricle</h2>
      </Link>
      <nav className="space-y-12">
        <a href="/train" className="block">
          <div className="group w-12 h-12 rounded-lg flex items-center justify-center bg-[#FFC0CB] hover:bg-[#4848A1] hover:border-[#FFC0CB] hover:scale-105 transition-colors duration-200 border-[#4848A1] border-1">
            <GraduationCap className="text-black group-hover:text-[#FFC0CB]" />
          </div>
        </a>
        <a href="/profile" className="block">
          <div className="group w-12 h-12 rounded-lg flex items-center justify-center bg-[#FFC0CB] hover:bg-[#4848A1] hover:border-[#FFC0CB] hover:scale-105 transition-colors duration-200 border-[#4848A1] border-1">
            <UserRound className="text-black group-hover:text-[#FFC0CB]" />
          </div>
        </a>
        <a href="/settings" className="block">
          <div className="group w-12 h-12 rounded-lg flex items-center justify-center bg-[#FFC0CB] hover:bg-[#4848A1] hover:border-[#FFC0CB] hover:scale-105 transition-colors duration-200 border-[#4848A1] border-1">
            <Settings className="text-black group-hover:text-[#FFC0CB]" />
          </div>
        </a>
      </nav>
    </aside>
  );
}
