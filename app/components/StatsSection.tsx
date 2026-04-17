"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function useCounter(target: number, duration = 1800, start = false): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [start, target, duration]);

  return count;
}

interface StatCardProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function StatCard({ value, suffix, label, delay }: StatCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(value, 1800, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center shadow-lg"
    >
      {/* Number */}
      <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-400">
        {count}
        {suffix}
      </p>

      {/* Label */}
      <p className="mt-2 text-blue-100 text-xs sm:text-sm uppercase tracking-widest">
        {label}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-12 sm:py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
      
      {/* Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-amber-400/20 blur-3xl rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <StatCard value={500} suffix="+" label="Students Enrolled" delay={0} />
          <StatCard value={95} suffix="%" label="Success Rate" delay={0.15} />
          <StatCard value={10} suffix="+" label="Years of Excellence" delay={0.3} />
        </div>

      </div>
    </section>
  );
}