"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function MapSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">Find Us</p>
          <h3 className="text-4xl font-extrabold text-slate-800">
            📍 We're in Tekhand, New Delhi
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-2xl overflow-hidden shadow-xl border border-slate-200"
          style={{ height: 400 }}
        >
          <iframe
            title="Pradhan Coaching Center Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.264!2d77.3141!3d28.5183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce1b5f1111111%3A0x0!2sTekhand%2C+New+Delhi%2C+Delhi!5e0!3m2!1sen!2sin!4v1"
          />
        </motion.div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://maps.google.com/?q=Tekhand,New+Delhi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors text-sm justify-center"
          >
            📍 Open in Google Maps
          </a>
          
        </div>
      </div>
    </section>
  );
}