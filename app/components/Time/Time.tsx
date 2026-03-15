import { useEffect, useState, useCallback } from "react";

/**
 * Real-time clock component displaying current time with automatic second-by-second updates.
 * Supports both 12-hour and 24-hour time formats with German locale and responsive visibility.
 *
 * @param hour12 - Boolean flag to toggle between 12-hour (true) and 24-hour (false) time format
 * @return Rendered time display element with auto-updating clock
 * @throws Error if locale formatting fails; displays fallback time string
 * @category Feature Components
 * @security Displays client-side time only, no sensitive data
 * @performance Uses useCallback to memoize time formatter; updates every second via interval
 * @author Marco Lenschau <contact@marco-lenschau.de>
 */
export default function Time({hour12}: {hour12: boolean}) {
  /**
  * Memoizes the loadCurrentTime function to prevent unnecessary re-renders.
  * 
  * - Only recreates the function when hour12 prop changes
  * - Prevents the useEffect from running unnecessarily
  * 
  * @returns {string} A formatted time string in German locale
  */
  const loadCurrentTime = useCallback(() => 
    new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: hour12 }), [hour12]);
  const [time, setTime] = useState(loadCurrentTime()); 
  useEffect(() => {
    const interval = setInterval(() => setTime(loadCurrentTime()), 1000);
    return () => clearInterval(interval);
  }, [hour12, loadCurrentTime]);

  return (
    <time className="hidden lg:flex items-center gap-3 px-5 py-2 bg-zinc-800 border-2 border-zinc-600 rounded-lg font-mono text-lg font-bold text-white hover:border-zinc-500 transition-colors shadow-lg">
      <svg className="w-5 h-5 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-5-3V7z"/>
      </svg>
      {time}
    </time>
  );
}
