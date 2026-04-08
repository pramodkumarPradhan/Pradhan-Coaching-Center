"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function ToppersWall() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const toppers = [
    { name: "Riya Gupta", class: "Class 10", score: "98.2%", subject: "Science Stream", year: "2025", rank: "🥇" },
    { name: "Aditya Sharma", class: "Class 12", score: "96.8%", subject: "Commerce", year: "2025", rank: "🥈" },
    { name: "Pooja Meena", class: "Class 10", score: "95.4%", subject: "All Subjects", year: "2025", rank: "🥉" },
    { name: "Karan Yadav", class: "Class 12", score: "94.6%", subject: "PCM", year: "2025", rank: "⭐" },
    { name: "Tanvi Singh", class: "Class 9", score: "93.8%", subject: "All Subjects", year: "2024", rank: "⭐" },
    { name: "Rohit Patel", class: "Class 12", score: "92.2%", subject: "PCB", year: "2024", rank: "⭐" },
  ];

  return (
    <section
      ref={ref}
      className="py-24"
      style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-2">
            Hall of Fame
          </p>
          <h3 className="text-4xl font-extrabold text-white">🏆 Our Toppers</h3>
          <p className="text-slate-400 mt-3">Proud of every student who made us proud.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {toppers.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-7 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3">{t.rank}</div>
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
                {t.name[0]}
              </div>
              <h4 className="text-white font-extrabold text-lg">{t.name}</h4>
              <p className="text-slate-400 text-sm">
                {t.class} · {t.subject}
              </p>
              <p className="text-amber-400 font-extrabold text-3xl mt-3">{t.score}</p>
              <p className="text-slate-500 text-xs mt-1">Board Exam {t.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}