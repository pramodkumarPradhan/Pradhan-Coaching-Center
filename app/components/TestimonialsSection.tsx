"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  grade: string;
  delay: number;
}

function TestimonialCard({ quote, name, grade, delay }: TestimonialCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 flex flex-col gap-4"
    >
      <div className="flex gap-1 text-amber-400 text-lg">★★★★★</div>
      <p className="text-slate-600 italic leading-relaxed">"{quote}"</p>
      <div className="flex items-center gap-3 mt-2">
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
          {name[0]}
        </div>
        <div>
          <p className="font-semibold text-slate-800 text-sm">{name}</p>
          <p className="text-xs text-slate-400">{grade}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "The teachers here explain every concept so patiently. My board score improved by 30 marks!",
      name: "Rahul Sharma",
      grade: "Class 10 · 2025 Batch",
    },
    {
      quote: "Weekly tests gave me the confidence I needed. I cleared my entrance exam in first attempt.",
      name: "Sneha Patel",
      grade: "Class 12 · Science",
    },
    {
      quote: "Best decision my parents made. The study material is top-notch and very exam-focused.",
      name: "Arjun Verma",
      grade: "Class 9 · 2024 Batch",
    },
    {
      quote: "Small batch sizes mean teachers actually know your weak points and help you fix them.",
      name: "Priya Singh",
      grade: "Class 11 · Commerce",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-100 to-blue-50 py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
            Student Stories
          </p>
          <h3 className="text-4xl font-extrabold text-slate-800">What Our Students Say</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}