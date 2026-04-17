"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function YouTubeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-14 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-red-600/20 blur-3xl rounded-full" />

      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <p className="inline-block bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold px-4 py-2 rounded-full mb-4">
            Free Education on YouTube
          </p>

          <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
            Learn Free on <span className="text-red-500">YouTube</span>
          </h3>

          <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto">
            Class 6th to 12th — Science, Math, SST, English & Economics.
          </p>
        </motion.div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-5 gap-8 items-center">


          {/* VIDEOS SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="md:col-span-3"
          >
            <div className="relative">

              {/* 🔴 Subscriber Badge */}
              <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-600 to-red-800 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow">
                🔥 1.48K Subscribers
              </div>

              {/* Videos Grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                
                {/* Video 1 */}
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/0ZyMR85u3eQ"
                    title="Video 1"
                    allowFullScreen
                  />
                </div>

                {/* Video 2 */}
                <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/SKo8st2Mhug"
                    title="Video 2"
                    allowFullScreen
                  />
                </div>

              </div>
            </div>

            <p className="text-slate-500 text-xs mt-3 text-center">
              ▶ Latest uploads · Radha Rani Free Education
            </p>
          </motion.div>

          {/* RIGHT SIDE CARD */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="md:col-span-2"
          >
            <div className="relative group max-w-sm mx-auto">

              {/* Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-800 rounded-2xl blur-md opacity-30 group-hover:opacity-50 transition"></div>

              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">

                {/* Avatar */}
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white flex items-center justify-center border-4 border-red-500">
                  <span className="text-red-600 font-bold text-xl">R</span>
                </div>

                {/* Info */}
                <h4 className="text-white font-semibold text-lg">
                  Radha Rani Free Education
                </h4>
                <p className="text-slate-400 text-xs mb-4">
                  @radharanifreeeducation3647
                </p>

                {/* Divider */}
                <div className="w-10 h-[2px] bg-red-500 mx-auto mb-4"></div>

                {/* CTA */}
                <a
                  href="https://www.youtube.com/@radharanifreeeducation3647?sub_confirmation=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-red-600 font-bold py-2.5 rounded-lg hover:bg-red-50 transition"
                >
                  Subscribe Now
                </a>

                {/* View All */}
                <a
                  href="https://www.youtube.com/@radharanifreeeducation3647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-3 text-xs text-slate-400 hover:text-white"
                >
                  View All Videos →
                </a>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}