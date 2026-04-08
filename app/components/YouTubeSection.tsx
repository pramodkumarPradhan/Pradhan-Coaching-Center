"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function YouTubeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const channelStats = [
    { icon: "▶", value: "570+", label: "Videos" },
    { icon: "👥", value: "1.48K", label: "Subscribers" },
    { icon: "👁", value: "1.43L+", label: "Total Views" },
    { icon: "📅", value: "Since 2018", label: "Teaching Online" },
  ];

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)" }}
    >
      {/* Red glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #ff0000 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Free Education on YouTube
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Learn Free on <span className="text-red-500">YouTube</span>
          </h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Class 1st to 12th — Science, Math, SST, English & Economics. 570+ free video lessons.
          </p>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
        >
          {channelStats.map((s, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm"
            >
              <p className="text-2xl mb-1">{s.icon}</p>
              <p className="text-xl font-extrabold text-white">{s.value}</p>
              <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Video + Subscribe */}
        <div className="grid md:grid-cols-5 gap-8 items-start">
          {/* Video embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="md:col-span-3"
          >
            <div
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
            >
              <iframe
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                src="https://www.youtube.com/embed/w9kw8Jm-Pk4?si=4sUt9ILF891RU5fn"
                title="Radha Rani Free Education"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <p className="text-slate-500 text-xs mt-3 text-center">
              ▶ Latest upload · Radha Rani Free Education
            </p>
          </motion.div>

          {/* Subscribe card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="md:col-span-2 flex flex-col gap-5"
          >
            {/* Channel identity */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-red-500 bg-red-100 flex items-center justify-center">
                <span className="text-red-500 text-2xl font-extrabold">R</span>
              </div>
              <h4 className="text-white font-extrabold text-lg">Radha Rani Free Education</h4>
              <p className="text-slate-400 text-sm mt-1">@radharanifreeeducation3647</p>
            </div>

            {/* Subscribe CTA */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-6 text-center shadow-xl shadow-red-900/40">
              <p className="text-white/80 text-sm mb-2 uppercase tracking-widest font-semibold">
                Join for Free
              </p>
              <p className="text-white font-extrabold text-2xl mb-1">Subscribe Now!</p>
              <p className="text-red-200 text-sm mb-5">
                Get notified for every new free lesson 🔔
              </p>
              <a
                href="https://www.youtube.com/@radharanifreeeducation3647?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-red-600 font-extrabold px-6 py-3 rounded-xl hover:bg-red-50 transition-colors duration-200 shadow-lg text-sm w-full justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Subscribe on YouTube
              </a>
            </div>

            {/* View all videos */}
            <a
              href="https://www.youtube.com/@radharanifreeeducation3647"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-slate-300 font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              View All 570+ Videos →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}