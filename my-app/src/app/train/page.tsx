import Link from "next/link";
import React from "react";

export default function Train() {
  return (
    <div className="bg-[#2C2C71] text-[#FFC0CB] min-h-screen p-8">
      <div className="flex flex-col justify-center gap-8 items-center">
        <h1 className="font-bold text-2xl text-[#FFC0CB] mb-8 mt-4">
          Choose exercise
        </h1>
        <Link
          href="/train/chords"
          className="bg-[#4848A1] border-2 border-[#FFC0CB] rounded-full p-2 md:w-120 text-center text-[#FFC0CB] hover:border-[#4848A1] hover:bg-[#FFC0CB] hover:text-[#4848A1] transition-colors duration-200"
        >
          Chord training
        </Link>
        <Link
          href="/train/intervals"
          className="bg-[#4848A1] border-2 border-[#FFC0CB] rounded-full p-2 md:w-120 text-center text-[#FFC0CB] hover:border-[#4848A1] hover:bg-[#FFC0CB] hover:text-[#4848A1] transition-colors duration-200"
        >
          Interval training
        </Link>
        <Link
          href="/train/notes"
          className="bg-[#4848A1] border-2 border-[#FFC0CB] rounded-full p-2 md:w-120 text-center text-[#FFC0CB] hover:border-[#4848A1] hover:bg-[#FFC0CB] hover:text-[#4848A1] transition-colors duration-200"
        >
          Notes training
        </Link>
      </div>
    </div>
  );
}
