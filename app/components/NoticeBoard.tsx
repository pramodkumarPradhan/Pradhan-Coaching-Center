"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function NoticeBoard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const notices = [
    {
      tag: "Admission",
      color: "bg-green-100 text-green-700",
      date: "26 Mar 2026",
      text: "Admissions open for 2026–27 session. Limited seats available for Class 9–12 batches.",
    },
    {
      tag: "Exam",
      color: "bg-red-100 text-red-700",
      date: "20 Mar 2026",
      text: "Monthly test scheduled for all batches on 5th April 2026. Syllabus shared on WhatsApp group.",
    },
    {
      tag: "Holiday",
      color: "bg-amber-100 text-amber-700",
      date: "15 Mar 2026",
      text: "Center will remain closed on 14th April (Ambedkar Jayanti). Classes resume 15th April.",
    },
    {
      tag: "Result",
      color: "bg-blue-100 text-blue-700",
      date: "10 Mar 2026",
      text: "Class 10 & 12 Board Result 2025: 95% students scored above 80%. Congratulations to all!",
    },
    {
      tag: "Download",
      color: "bg-purple-100 text-purple-700",
      date: "5 Mar 2026",
      text: "Class 10 Science & Math sample papers for 2026 board exam uploaded. Visit Downloads section.",
    },
  ];

  return (
    <section ref={ref} className="py-10 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
            Latest Updates
          </p>
          <h3 className="text-4xl font-extrabold text-slate-800">📌 Notice Board</h3>
        </motion.div>

        <div className="flex flex-col gap-4">
          {notices.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="bg-white border border-slate-100 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full shrink-0 mt-0.5 ${n.color}`}
              >
                {n.tag}
              </span>
              <p className="flex-1 text-slate-700 text-sm leading-relaxed">{n.text}</p>
              <p className="text-xs text-slate-400 shrink-0 mt-0.5">{n.date}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="/notices"
            className="inline-block border-2 border-blue-600 text-blue-600 font-bold px-8 py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-colors duration-200"
          >
            View All Notices →
          </a>
        </div>
      </div>
    </section>
  );
}