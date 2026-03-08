import { useState } from "react";


export default function Time() {
  const loadCurrentTime = () => new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  const [time, setTime] = useState(loadCurrentTime); 
  const interval = setInterval(() => setTime(loadCurrentTime()),1000); 

  return (
    <time className="font-bold text-4xl">{time}</time>
  );
}
