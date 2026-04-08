"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function AdmissionForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [form, setForm] = useState({ name: "", phone: "", cls: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={ref} className="py-5 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
              Secure Your Seat
            </p>
            <h3 className="text-4xl font-extrabold text-slate-800 mb-4">Apply for Admission</h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Fill in the form and our team will contact you within 24 hours to confirm your batch.
            </p>
            {[
              { icon: "✅", text: "Free demo class before admission" },
              { icon: "📞", text: "Call back within 24 hours" },
              { icon: "💳", text: "Flexible fee payment options" },
              { icon: "📚", text: "Study material from day 1" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 mb-3 text-slate-700 text-sm font-medium">
                <span className="text-lg">{item.icon}</span>
                {item.text}
              </div>
            ))}
            <div className="mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
              <p className="text-slate-700 text-sm font-semibold mb-1">📞 Call us directly</p>
              <a href="tel:+919999902095" className="text-blue-600 font-extrabold text-xl hover:text-blue-700">
                +91 63706 27752
              </a>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {submitted ? (
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-2xl font-extrabold text-green-700 mb-2">
                  Application Received!
                </h4>
                <p className="text-green-600">
                  We'll call you on <strong>{form.phone}</strong> within 24 hours to schedule your
                  free demo class.
                </p>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-8 flex flex-col gap-4 shadow-md"
              >
                <h4 className="font-extrabold text-slate-800 text-xl mb-2">Enquiry Form</h4>

                {[
                  { label: "Student Name *", name: "name", type: "text", placeholder: "Full name" },
                  { label: "Parent's Phone *", name: "phone", type: "tel", placeholder: "+91 00000 00000" },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">
                      {f.label}
                    </label>
                    <input
                      required
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      value={(form as any)[f.name]}
                      onChange={handle}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">
                    Applying for Class *
                  </label>
                  <select
                    required
                    name="cls"
                    value={form.cls}
                    onChange={handle}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select class</option>
                    {["6", "7", "8", "9", "10", "11", "12"].map((c) => (
                      <option key={c} value={c}>
                        Class {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">
                    Subject / Stream
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handle}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Select stream</option>
                    {[
                      "All Subjects",
                      "Science (PCM)",
                      "Science (PCB)",
                      "Commerce",
                      "Mathematics only",
                      "English only",
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handle}
                    rows={3}
                    placeholder="Any specific queries..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-colors duration-200 mt-2 shadow-lg shadow-blue-200"
                >
                  Submit Enquiry →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}