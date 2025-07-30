export default function SettingsPage() {
    return (
    <div className="flex min-h-screen bg-[#2a237f] text-white transition-colors duration-300">
      <main className="flex flex-col justify-between flex-1 px-8 py-10">
        {/* Centered Title + Buttons */}
        <div className="flex-1 flex flex-col justify-start space-y-15 mt-20">
          <h1 className="text-5xl font-bold text-center">Settings</h1>

          <div className="w-full">
            <div className="grid gap-10 w-full max-w-[600px] mx-auto">
              <button className="w-full border bg-[#4848A1] border-pink-200 text-pink-200 py-3 rounded-full text-lg hover:bg-pink-200 hover:text-[#2a237f] transition">
                Profile
              </button>
              <button className="w-full border bg-[#4848A1] border-pink-200 text-pink-200 py-3 rounded-full text-lg hover:bg-pink-200 hover:text-[#2a237f] transition">
                Courses
              </button>
              <button className="w-full border bg-[#4848A1] border-pink-200 text-pink-200 py-3 rounded-full text-lg hover:bg-pink-200 hover:text-[#2a237f] transition">
                Dark Mode
              </button>
            </div>
          </div>
        </div>

        {/* Log Out Button */}
        <div className="w-full max-w-[250px] mx-auto">
          <button className="w-full mb-4 border bg-[#4848A1] border-pink-200 text-pink-200 py-3 px-6 rounded-full text-lg hover:bg-pink-200 hover:text-[#2a237f] transition">
            Log Out
          </button>
        </div>
      </main>
    </div>
  );
}
