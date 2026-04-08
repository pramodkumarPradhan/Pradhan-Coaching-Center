"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FacultySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const faculty = [
    { name: "Mr. Rajesh Kumar", subject: "Mathematics", exp: "12 yrs", badge: "Class 9–12", color: "from-blue-500 to-blue-700", initial: "RK" },
    { name: "Mrs. Sunita Sharma", subject: "Science", exp: "9 yrs", badge: "Class 6–10", color: "from-green-500 to-green-700", initial: "SS" },
    { name: "Mr. Amit Verma", subject: "English & SST", exp: "8 yrs", badge: "Class 6–12", color: "from-purple-500 to-purple-700", initial: "AV" },
    { name: "Mrs. Priya Singh", subject: "Economics & Accounts", exp: "7 yrs", badge: "Class 11–12", color: "from-rose-500 to-rose-700", initial: "PS" },
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
            Meet the Team
          </p>
          <h3 className="text-4xl font-extrabold text-slate-800">Our Expert Faculty</h3>
          <p className="text-slate-500 mt-3">Passionate educators with proven results year after year.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {faculty.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group text-center bg-white border border-slate-100 rounded-2xl p-7 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${f.color} flex items-center justify-center text-white font-extrabold text-xl shadow-lg`}
              >
                {f.initial}
              </div>
              <h4 className="font-extrabold text-slate-800 text-base leading-tight">{f.name}</h4>
              <p className="text-blue-600 font-semibold text-sm mt-1">{f.subject}</p>
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                  📚 {f.badge}
                </span>
                <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                  ⏱ {f.exp}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}