"use client";
import { useEffect, useState } from "react";

export default function ExamCountdown() {
  const BOARD_DATE = new Date("2026-02-15T00:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = BOARD_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
        secs: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", val: timeLeft.days },
    { label: "Hours", val: timeLeft.hours },
    { label: "Mins", val: timeLeft.mins },
    { label: "Secs", val: timeLeft.secs },
  ];

  return (
    <div className="bg-gradient-to-r from-amber-500 to-orange-500 py-5">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
        <p className="text-white font-extrabold text-base uppercase tracking-widest text-center">
          🎯 CBSE Board Exams 2026
        </p>
        <div className="flex gap-3">
          {units.map(({ label, val }) => (
            <div
              key={label}
              className="bg-white/20 backdrop-blur rounded-xl px-4 py-2 text-center min-w-[60px]"
            >
              <p className="text-white font-extrabold text-2xl leading-none">
                {String(val).padStart(2, "0")}
              </p>
              <p className="text-white/80 text-xs uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>
        <p className="text-white/90 font-semibold text-sm text-center">
          Enroll now · Don't miss out!
        </p>
      </div>
    </div>
  );
}