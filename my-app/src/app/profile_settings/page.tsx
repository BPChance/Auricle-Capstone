"use client";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#2C2C71] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center">Profile</h1>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              className="w-full bg-[#4848A1] border-2 border-[#FFC0CB] rounded-lg py-2 px-4 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Username</label>
            <input
              type="text"
              className="w-full bg-[#4848A1] border-2 border-[#FFC0CB] rounded-lg py-2 px-4 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-[#4848A1] border-2 border-[#FFC0CB] rounded-lg py-2 px-4 outline-none"
            />
          </div>

          {/* Password Fields Side-by-Side */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">Current Password</label>
              <input
                type="password"
                className="w-full bg-[#4848A1] border-2 border-[#FFC0CB] rounded-lg py-2 px-4 outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">New Password</label>
              <input
                type="password"
                className="w-full bg-[#4848A1] border-2 border-[#FFC0CB] rounded-lg py-2 px-4 outline-none"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-4 text-center">
            <button
              type="button"
              disabled
              className="w-full max-w-[200px] bg-[#4848A1] border-2 border-[#FFC0CB] text-pink-200 rounded-lg px-6 py-2 opacity-50 cursor-not-allowed"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
