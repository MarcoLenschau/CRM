"use client";

import { Dispatch, SetStateAction, useState } from "react";
import ErrorDialog from "./components/ui/dialogs/ErrorDialog/ErrorDialog";

export type Status = Promise<{status: number}>;

export default function Login() {
  const [errorDialogMessage, setErrorDialog] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  return ( 
    <div className="flex">
     <div className="w-full flex flex-col">
        <div className="py-6 border-b-2 border-zinc-700">
        <div className="flex items-center gap-4 pl-75">
          <div className="bg-purple-900/30 rounded-xl p-3 border border-purple-700/50">
            <svg className="w-8 h-8 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>  
          </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your business with our powerful CRM platform</p>
        </div>
        </div>
      </div>


        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-dark min-h-0 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md border-2 p-9 rounded-xl border-zinc-700">
            {/* Error Dialog */}
            {errorDialogMessage !== "" && <ErrorDialog text={errorDialogMessage} setErrorDialog={setErrorDialog}/>}

            {/* Login Card */}
            <div className="space-y-6">
              {/* Form */}
              <form onSubmit={(e) => {
                e.preventDefault();
                login(email, password, setErrorDialog);
              }} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-2">Email Address</label>
                  <input 
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-zinc-800/50 text-white rounded-lg px-4 py-3 border border-zinc-600 placeholder-gray-500 focus:border-blue-500 focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                    required
                  />
                </div>

                {/* Password Field with Toggle */}
                <div>
                  <label className="text-sm font-semibold text-gray-200 block mb-2">Password</label>
                  <div className="relative">
                    <input 
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-zinc-800/50 text-white rounded-lg px-4 py-3 border border-zinc-600 placeholder-gray-500 focus:border-blue-500 focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.83 9L15.29 12.46c.04-.32.07-.64.07-.96 0-1.66-1.34-3-3-3-.32 0-.64.03-.96.07zM19.07 4.93L4.93 19.07c.91 1.04 1.97 1.95 3.13 2.62 1.66.96 3.56 1.5 5.54 1.5 5.03 0 9.27-3.11 11-7.5-.9-2.16-2.3-4.08-4.05-5.56zM12 17c-2.76 0-5-2.24-5-5 0-.64.13-1.26.36-1.83l-2.63 2.63c-.26.65-.38 1.36-.38 2.2 0 3.31 2.69 6 6 6 .84 0 1.55-.12 2.2-.38l2.63-2.63c-.57.23-1.19.36-1.83.36zM12 4c-5.03 0-9.27 3.11-11 7.5.9 2.16 2.3 4.08 4.05 5.56l14.14-14.14c-.91-1.04-1.97-1.95-3.13-2.62C17.68 4.5 14.78 4 12 4z"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input 
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 accent-blue-500 cursor-pointer"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <button 
                  type="submit"
                  className="w-full bg-green-900 text-white py-3 rounded-lg font-semibold hover:bg-green-800/90 text-base mt-6"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-950 text-gray-400">or</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
                    Create one
                  </a>
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-700">
                <div className="text-center">
                  <svg className="w-5 h-5 mx-auto mb-2 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                  </svg>
                  <p className="text-xs text-gray-500">SSL Secure</p>
                </div>
                <div className="text-center">
                  <svg className="w-5 h-5 mx-auto mb-2 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <p className="text-xs text-gray-500">Verified</p>
                </div>
                <div className="text-center">
                  <svg className="w-5 h-5 mx-auto mb-2 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  <p className="text-xs text-gray-500">Trusted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const login = async(email: string, password: string, setErrorDialog: Dispatch<SetStateAction<string>>): Promise<void> => {
  if (!email || !password) {
    setErrorDialog("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      setErrorDialog(data.error || "Login failed. Please try again.");
      return;
    }

    // Token im SessionStorage und als Cookie speichern
    if (data.token) {
      sessionStorage.setItem("authToken", data.token);
      
      // Optional: User Info auch speichern
      sessionStorage.setItem("userEmail", email);
      
      // Token auch als Cookie speichern (damit Middleware es sieht)
      // Cookie wird automatisch mit jedem Request mitgeschickt
      document.cookie = `token=${data.token}; path=/; SameSite=Strict`;
      
      // Weiterleitung zum Dashboard nach erfolgreichem Login
      window.location.href = "/dashboard";
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    setErrorDialog(`Error: ${errorMessage}`);
  }
};
