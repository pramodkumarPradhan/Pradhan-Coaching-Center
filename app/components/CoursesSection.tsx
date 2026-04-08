"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CoursesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const courses = [
    {
      badge: "Foundation",
      badgeColor: "bg-green-100 text-green-700",
      title: "Class 6 – 8",
      subjects: ["Mathematics", "Science", "English", "Social Studies"],
      timing: "Mon–Sat · 4:00 PM – 6:00 PM",
      seats: "20 seats / batch",
      highlight: false,
    },
    {
      badge: "🔥 Most Popular",
      badgeColor: "bg-amber-100 text-amber-700",
      title: "Class 9 – 10",
      subjects: ["Mathematics", "Science", "English", "SST", "Hindi"],
      timing: "Mon–Sat · 7:00 AM – 9:00 AM",
      seats: "15 seats / batch",
      highlight: true,
    },
    {
      badge: "Senior",
      badgeColor: "bg-blue-100 text-blue-700",
      title: "Class 11 – 12",
      subjects: ["Physics · Chemistry · Maths", "Biology · Economics", "Accountancy · Business"],
      timing: "Mon–Sat · 6:00 PM – 8:00 PM",
      seats: "15 seats / batch",
      highlight: false,
    },
  ];

  return (
    <section ref={ref} className="py-4 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
            Programs Offered
          </p>
          <h3 className="text-4xl font-extrabold text-slate-800">Our Batches & Courses</h3>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Expert-led small batches for focused, personalised learning from Class 6 to 12.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              className={`relative rounded-2xl border-2 p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                ${
                  c.highlight
                    ? "border-blue-600 shadow-lg shadow-blue-100 bg-blue-600 text-white"
                    : "border-slate-100 bg-white text-slate-800 shadow-md"
                }`}
            >
              {c.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-900 text-xs font-extrabold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    c.highlight ? "bg-white/20 text-white" : c.badgeColor
                  }`}
                >
                  {c.badge}
                </span>
                <h4
                  className={`text-2xl font-extrabold mt-3 ${
                    c.highlight ? "text-white" : "text-slate-800"
                  }`}
                >
                  {c.title}
                </h4>
              </div>

              <ul className="flex flex-col gap-2">
                {c.subjects.map((s, j) => (
                  <li
                    key={j}
                    className={`flex items-center gap-2 text-sm ${
                      c.highlight ? "text-blue-100" : "text-slate-600"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        c.highlight ? "bg-amber-400" : "bg-blue-600"
                      }`}
                    />
                    {s}
                  </li>
                ))}
              </ul>

              <div
                className={`border-t pt-4 flex flex-col gap-2 text-sm ${
                  c.highlight ? "border-white/20 text-blue-100" : "border-slate-100 text-slate-500"
                }`}
              >
                <p>🕐 {c.timing}</p>
                <p>👥 {c.seats}</p>
              </div>

              <a
                href="/admission"
                className={`mt-auto text-center font-bold py-3 rounded-xl transition-colors duration-200
                  ${
                    c.highlight
                      ? "bg-amber-400 text-slate-900 hover:bg-amber-300"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
              >
                Enroll Now →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}