"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export type Status = Promise<{status: number}>;

export default function Register() {
  const searchParams = useSearchParams();
  const [toastMessage, setToastMessage] = useState(searchParams.get("error") || "");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  
  return ( 
    <div className="flex flex-col">
      {/* Header - Sticky */}
      <div className="py-6 border-b-2 border-zinc-700">
        <div className="flex items-center gap-4 pl-75">
          <div className="bg-green-900/30 rounded-xl p-3 border border-green-700/50">
            <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Create Account</h1>
            <p className="text-sm text-gray-400 mt-1">Join our CRM platform and start managing your business</p>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto scrollbar-dark">
        <section className="flex flex-col justify-center items-center gap-4 px-8 py-8">
          <div className="w-120">

            {/* Register Card */}
            <div className="rounded-xl border-2 border-zinc-700 p-6">
              <title>Register</title>
              
              {/* Form Header */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-1">Sign Up</h2>
                <p className="text-xs text-gray-400">Create your account to get started</p>
              </div>

              {/* Form */}
              <form onSubmit={(e) => {
                e.preventDefault();
                register(email, name, password, passwordRepeat);
              }} className="space-y-3">
                {/* Email Field */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide block mb-1">Email</label>
                  <input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors text-sm"
                    required
                  />
                </div>

                {/* Name Field */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide block mb-1">Name</label>
                  <input 
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors text-sm"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide block mb-1">Password</label>
                  <input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors text-sm"
                    required
                  />
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="text-xs font-semibold text-gray-300 uppercase tracking-wide block mb-1">Confirm</label>
                  <input 
                    id="password-repeat"
                    type="password"
                    value={passwordRepeat}
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-700/50 text-white rounded-lg px-3 py-2 border border-zinc-600 placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors text-sm"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="space-y-2 mt-6">
                  <button 
                    type="submit"
                    className="w-full bg-green-900 hover:bg-green-800/90 text-white py-2 rounded-lg font-semibold text-sm cursor-pointer">
                    Create Account
                  </button>
                  <button 
                    type="reset"
                    className="w-full bg-zinc-700/50 hover:bg-zinc-700 text-gray-300 hover:text-white py-2 rounded-lg font-semibold text-sm cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </form>

              {/* Footer Link */}
              <div className="mt-4 pt-4 border-t border-zinc-700 text-center">
                <p className="text-xs text-gray-400">
                  Already have an account? 
                  <a href="/login" className="text-green-400 hover:text-green-300 font-semibold ml-1 transition-colors">
                    Sign in
                  </a>
                </p>
              </div>
            <div className="mt-7 grid grid-cols-3 gap-3 text-center">
              <div className="text-xs text-gray-500">
                <svg className="w-4 h-4 mx-auto mb-1 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <span className="text-xs">Secure</span>
              </div>
              <div className="text-xs text-gray-500">
                <svg className="w-4 h-4 mx-auto mb-1 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-xs">Protected</span>
              </div>
              <div className="text-xs text-gray-500">
                <svg className="w-4 h-4 mx-auto mb-1 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span className="text-xs">Verified</span>
              </div>
            </div>
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const register = async(email: string, name: string, password: string, passwordRepeat: string): Promise<void> => {
  if (password !== passwordRepeat) {
    console.error("Passwords do not match");
    return;
  }
  
  if (!email || !name || !password) {
    console.error("Please fill in all fields");
    return;
  }
  const response = await fetchData(name, email, password);
};

const fetchData = async(name: string, email: string, password: string): Status => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      name: name,
      email: email,
      password: password
    })
  });
  return response;
}
