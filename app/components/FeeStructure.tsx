"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function FeeStructure() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const rows = [
    { class: "Class 6 – 8", monthly: "₹1,200", quarterly: "₹3,300", annual: "₹11,500", subjects: "All subjects" },
    { class: "Class 9 – 10", monthly: "₹1,800", quarterly: "₹5,000", annual: "₹17,500", subjects: "All 5 subjects" },
    { class: "Class 11 – 12 (Science)", monthly: "₹2,200", quarterly: "₹6,200", annual: "₹22,000", subjects: "PCM / PCB" },
    { class: "Class 11 – 12 (Commerce)", monthly: "₹1,800", quarterly: "₹5,000", annual: "₹17,500", subjects: "Eco, Accounts, BSt" },
  ];

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
            Transparent Pricing
          </p>
          <h3 className="text-4xl font-extrabold text-slate-800">Fee Structure 2025–26</h3>
          <p className="text-slate-500 mt-3">
            No hidden charges. Pay monthly, quarterly, or annually and save more.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {["Class / Batch", "Subjects", "Monthly", "Quarterly", "Annual (Save 20%)"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-left font-bold text-xs uppercase tracking-widest"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={i}
                    className={`border-t border-slate-100 hover:bg-blue-50 transition-colors ${
                      i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                    }`}
                  >
                    <td className="px-5 py-4 font-bold text-slate-800">{r.class}</td>
                    <td className="px-5 py-4 text-slate-500">{r.subjects}</td>
                    <td className="px-5 py-4 text-slate-700 font-semibold">{r.monthly}</td>
                    <td className="px-5 py-4 text-slate-700 font-semibold">{r.quarterly}</td>
                    <td className="px-5 py-4 font-extrabold text-green-600">{r.annual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-4 bg-amber-50 border-t border-amber-100 text-amber-800 text-xs font-semibold">
            💡 Sibling discount: 10% off for second child · Study materials included · No
            registration fee
          </div>
        </motion.div>
      </div>
    </section>
  );
}