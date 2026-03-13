import { useState, useEffect, SetStateAction, Dispatch } from "react";

export default function ThemeToggle() {
  const [setTheme, theme]: [Dispatch<SetStateAction<string>>, string] = SetDefaultTheme();
  
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex items-center w-16 h-8 rounded-full bg-zinc-700 border-2 border-zinc-600 hover:border-zinc-500 transition-all duration-300 shadow-lg"
      aria-label="Toggle theme"
    >
      {/* Slider background */}
      <div
        className={`absolute inset-0.5 rounded-full transition-all duration-300 ${
          theme === "dark" ? "bg-zinc-600/50" : "bg-zinc-600/50"
        }`}
      />

      {/* Sun icon (left side) */}
      <div className="absolute left-1.5 flex items-center justify-center w-6 h-6">
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l.707.707M6.343 17.657l.707.707M17.657 6.343l.707-.707M6.343 6.343l.707-.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
        </svg>
      </div>

      {/* Moon icon (right side) */}
      <div className="absolute right-1.5 flex items-center justify-center w-6 h-6">
        <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>

      {/* Animated thumb */}
      <div
        className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-300 bg-white shadow-lg ${
          theme === "dark"
            ? "left-1"
            : "right-1"
        }`}
      />
    </button>
  );
}

const SetDefaultTheme = ():[Dispatch<SetStateAction<string>>, string] => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useState(() => mediaQueryMatches(mediaQuery));
  useEffect(() => document.documentElement.setAttribute("data-theme", theme), [theme]);  
  mediaQuery.addEventListener("change", () => setTheme(mediaQueryMatches(mediaQuery)));
  return [setTheme, theme];
}

const mediaQueryMatches = (mediaQuery: MediaQueryList) => typeof window === "undefined" ? "light" : mediaQuery.matches ? "dark" : "light";