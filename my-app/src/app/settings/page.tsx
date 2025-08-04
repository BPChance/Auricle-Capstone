import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="bg-[#2C2C71] text-[#FFC0CB] min-h-screen p-8 flex flex-col">
      {/* Centered Title + Buttons */}
      <div className="flex flex-col gap-8 items-center pt-10">
        <h1 className="font-bold text-2xl text-[#FFC0CB]">
          Settings
        </h1>
        <Link
          href="/profile_settings"
          className="bg-[#4848A1] border-2 border-[#FFC0CB] rounded-full p-2 md:w-120 text-center text-[#FFC0CB] hover:border-[#4848A1] hover:bg-[#FFC0CB] hover:text-[#4848A1] transition-colors duration-200">
          Profile
        </Link>
        <button className="bg-[#4848A1] border-2 border-[#FFC0CB] rounded-full p-2 md:w-120 text-center text-[#FFC0CB] hover:border-[#4848A1] hover:bg-[#FFC0CB] hover:text-[#4848A1] transition-colors duration-200">
          Courses
        </button>
        <button className="bg-[#4848A1] border-2 border-[#FFC0CB] rounded-full p-2 md:w-120 text-center text-[#FFC0CB] hover:border-[#4848A1] hover:bg-[#FFC0CB] hover:text-[#4848A1] transition-colors duration-200">
          Dark Mode
        </button>
      </div>
      
      {/* Log Out Button - positioned at bottom */}
      <div className="flex justify-center pb-8 mt-auto">
        <button className="bg-[#4848A1] border-2 border-[#FFC0CB] text-[#FFC0CB] py-3 px-6 rounded-full text-lg hover:bg-[#FFC0CB] hover:text-[#2a237f] transition-colors duration-200">
          Log Out
        </button>
      </div>
    </div>
  );
}