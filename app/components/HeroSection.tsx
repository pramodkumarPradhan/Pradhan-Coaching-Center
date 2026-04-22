"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center text-white overflow-hidden">

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dlcjyh6fb/image/upload/v1776234634/group_pic_2_lpr5ed.jpg')",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-slate-900/80 to-blue-800/70" />

      {/* Content */}
      <div className="relative text-center px-4 sm:px-6 max-w-4xl">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6"
        >
          Admissions Open 2025–26
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 sm:mb-6"
        >
          Empowering Students
          <br />
          <span className="text-amber-400">
            for Academic Excellence
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-blue-100 text-sm sm:text-base md:text-lg mb-6 sm:mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Expert faculty · Regular tests · Complete study materials · Small
          batches for personal attention
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#admission"
            className="bg-amber-400 text-slate-900 font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:bg-amber-300 transition-all duration-300 shadow-lg shadow-amber-500/30 hover:scale-105 text-sm sm:text-base flex items-center justify-center"
          >
            Admission Now →
          </a>
          <a
            href="/notes"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:scale-105 text-sm sm:text-base flex items-center justify-center"
          >
            View Our Notes 📚
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 text-[10px] sm:text-xs">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="text-base sm:text-lg"
        >
          ↓
        </motion.div>
        Scroll
      </div>
    </section>
  );
}