import { useEffect, useState } from "react";


export default function Time({hour12}: {hour12: boolean}) {
  const loadCurrentTime = () => new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: hour12 });
  const [time, setTime] = useState(loadCurrentTime); 
  useEffect(() => {
    const interval = setInterval(() => setTime(loadCurrentTime()), 1000);
    return () => clearInterval(interval);
  }, [hour12]);

  return (
    <time className="font-bold text-4xl">{time}</time>
  );
}
