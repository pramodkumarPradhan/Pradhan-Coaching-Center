"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
  delay: number;
}

function FeatureCard({ icon, title, desc, delay }: FeatureCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="group bg-white border border-slate-100 p-8 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center"
    >
      <div className="w-14 h-14 mx-auto mb-5 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h4 className="text-lg font-bold mb-2 text-slate-800">{title}</h4>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  const features = [
    {
      icon: "🎓",
      title: "Experienced Faculty",
      desc: "Highly qualified teachers with 10+ years of proven track records in board and competitive exams.",
    },
    {
      icon: "📝",
      title: "Regular Assessments",
      desc: "Weekly tests, mock papers, and individual performance tracking to keep students on track.",
    },
    {
      icon: "📚",
      title: "Study Materials",
      desc: "Curated notes, practice sheets, and downloadable PDFs aligned with latest syllabi.",
    },
    {
      icon: "🏆",
      title: "Result-Oriented",
      desc: "95% of our students achieve distinction. We celebrate every success.",
    },
    {
      icon: "👨‍👩‍👧",
      title: "Parent Connect",
      desc: "Monthly PTMs and real-time progress reports keep parents informed and involved.",
    },
    {
      icon: "💡",
      title: "Doubt Sessions",
      desc: "Dedicated doubt-clearing sessions every week so no student is left behind.",
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
          Why We Stand Out
        </p>
        <h3 className="text-4xl font-extrabold text-slate-800">Why Choose Pradhan?</h3>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}