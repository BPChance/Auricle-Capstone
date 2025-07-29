"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      router.push("/train");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D0E52] text-[#FFC0CB]">
      <form
        onSubmit={handleSignup}
        className="bg-[#2C2C71] p-8 rounded-lg shadow-lg space-y-6 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 rounded bg-[#4848A1] text-[#FFC0CB] border border-[#FFC0CB] shadow-2xl"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 rounded bg-[#4848A1] text-[#FFC0CB] border border-[#FFC0CB] shadow-2xl"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-[#FFC0CB] text-black font-bold rounded hover:bg-[#4848A1] transition duration-200 shadow-2xl"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
