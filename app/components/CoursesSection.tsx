"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function CoursesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const allowed = ["class-9", "class-10"];

  const courses = [
    {
      badge: "Foundation",
      title: "Class 6 – 8",
      subjects: [
        { name: "Mathematics", slug: "class-6" },
        { name: "Science", slug: "class-6" },
        { name: "English", slug: "class-6" },
      ],
      timing: "Mon–Sat · 4:00 PM – 6:00 PM",
      seats: "20 seats / batch",
      highlight: false,
    },
    {
      badge: "🔥 Most Popular",
      title: "Class 9 – 10",
      subjects: [
        { name: "Mathematics", slug: "class-9" },
        { name: "Science", slug: "class-9" },
        { name: "English", slug: "class-9" },
        { name: "SST", slug: "class-9" },
      ],
      timing: "Mon–Sat · 7:00 AM – 9:00 AM",
      seats: "15 seats / batch",
      highlight: true,
    },
    {
      badge: "Senior",
      title: "Class 11 – 12",
      subjects: [
        { name: "Physics", slug: "class-11" },
        { name: "Biology", slug: "class-11" },
      ],
      timing: "Mon–Sat · 6:00 PM – 8:00 PM",
      seats: "15 seats / batch",
      highlight: false,
    },
  ];

  return (
    <section ref={ref} className="relative py-20 bg-[#020617] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/30 blur-[120px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[120px] bottom-[-100px] right-[-100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-extrabold text-white">
            Our Courses
          </h3>
          <p className="text-gray-400 mt-3">
            Premium learning experience from Class 6 to 12
          </p>
        </motion.div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8">

          {courses.map((c, i) => {
            const isDisabled = !c.subjects.some((s) =>
              allowed.includes(s.slug)
            );

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                whileHover={!isDisabled ? { y: -12, scale: 1.03 } : {}}
                className={`relative group rounded-2xl p-8 backdrop-blur-xl border shadow-2xl transition ${isDisabled
                  ? "bg-white/5 border-white/10 opacity-60"
                  : c.highlight
                    ? "bg-gradient-to-br from-blue-600/40 to-indigo-700/40 border-white/20"
                    : "bg-white/5 border-white/10"
                  }`}
              >

                {/* Glow */}
                {!isDisabled && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 blur-xl transition rounded-2xl" />
                )}

                {/* LOCK OVERLAY */}
                {isDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center backdrop-blur-[2px] rounded-2xl">
                    <div className="text-center">
                      <div className="text-3xl mb-2">🔒</div>
                      <p className="text-gray-300 text-sm">Coming Soon</p>
                    </div>
                  </div>
                )}

                {/* MOST POPULAR */}
                {c.highlight && !isDisabled && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                {/* CONTENT */}
                <div className={`relative z-10 ${isDisabled ? "blur-[1px]" : ""}`}>

                  <p className="text-sm text-gray-300 mb-2">{c.badge}</p>

                  <h4 className="text-2xl font-bold text-white mb-4">
                    {c.title}
                  </h4>

                  <ul className="flex flex-col gap-2 mb-5">
                    {c.subjects.map((s, j) => {
                      const isAllowed = allowed.includes(s.slug);

                      return (
                        <motion.li
                          key={j}
                          whileHover={isAllowed ? { x: 6 } : {}}
                          className={`text-sm ${isAllowed ? "text-gray-300" : "text-gray-500"
                            }`}
                        >
                          {isAllowed ? (
                            <Link
                              href={`/downloads#${s.slug}`}
                              className="hover:text-white transition"
                            >
                              • {s.name}
                            </Link>
                          ) : (
                            <span>
                              • {s.name} 🔒
                            </span>
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>

                  <div className="text-sm text-gray-400 mb-5">
                    <p>🕐 {c.timing}</p>
                    <p>👥 {c.seats}</p>
                  </div>

                  {/* CTA */}
                  {!isDisabled && (
                    // <a
                    //   href="/admission"
                    //   className="block text-center py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:scale-105 transition"
                    // >
                    //   Enroll Now →
                    // </a>
                    <button
                      onClick={() => {
                        const el = document.getElementById("admission");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="relative group w-full overflow-hidden rounded-xl font-semibold"
                    >
                      {/* Glow Background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 blur-lg opacity-70 group-hover:opacity-100 transition duration-300" />

                      {/* Button Surface */}
                      <div className="relative flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-active:scale-95">

                        {/* Shine Effect */}
                        <span className="absolute inset-0 overflow-hidden rounded-xl">
                          <span className="absolute -left-20 top-0 h-full w-20 bg-white/20 skew-x-[-20deg] group-hover:animate-[shine_0.7s_ease]" />
                        </span>

                        <span>Enroll Now</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </button>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}