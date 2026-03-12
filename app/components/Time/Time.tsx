import { useEffect, useState, useCallback } from "react";


/**
 * A React functional component that displays the current time and updates it every second.
 * 
 * @param {Object} props - The props object.
 * @param {boolean} props.hour12 - A boolean indicating whether the time should be displayed in 12-hour format.
 * 
 * @returns {JSX.Element} A `<time>` element displaying the current time in a bold, large font.
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
    <time className="font-bold text-4xl hidden lg:block">{time}</time>
  );
}
