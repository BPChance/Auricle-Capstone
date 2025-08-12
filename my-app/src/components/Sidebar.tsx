"use client";

import Link from "next/link";
import { GraduationCap, UserRound, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-full sm:w-32 fixed bottom-0 sm:static flex flex-row sm:flex-col justify-center sm:justify-start items-center sm:items-center bg-[#1C1C3A] text-[#FFC0CB] p-4 sm:p-8 z-50">
      <Link href="/train">
        <h2 className="text-xl font-bold hidden sm:block mb-8">Auricle</h2>
      </Link>
      <nav className="flex flex-row sm:flex-col gap-8 sm:gap-12">
        <Link href="/train" className="block">
          <div className="group w-12 h-12 rounded-lg flex items-center justify-center bg-[#FFC0CB] hover:bg-[#4848A1] hover:border-[#FFC0CB] hover:scale-105 transition-colors duration-200 border-[#4848A1] border-1">
            <GraduationCap className="text-black group-hover:text-[#FFC0CB]" />
          </div>
        </Link>
        <Link href="/profile" className="block">
          <div className="group w-12 h-12 rounded-lg flex items-center justify-center bg-[#FFC0CB] hover:bg-[#4848A1] hover:border-[#FFC0CB] hover:scale-105 transition-colors duration-200 border-[#4848A1] border-1">
            <UserRound className="text-black group-hover:text-[#FFC0CB]" />
          </div>
        </Link>
        <Link href="/settings" className="block">
          <div className="group w-12 h-12 rounded-lg flex items-center justify-center bg-[#FFC0CB] hover:bg-[#4848A1] hover:border-[#FFC0CB] hover:scale-105 transition-colors duration-200 border-[#4848A1] border-1">
            <Settings className="text-black group-hover:text-[#FFC0CB]" />
          </div>
        </Link>
      </nav>
    </aside>
  );
}
