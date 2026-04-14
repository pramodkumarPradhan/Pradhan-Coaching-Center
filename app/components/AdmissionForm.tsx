"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const PERKS = [
  { icon: "✅", text: "Free demo class before admission" },
  { icon: "📞", text: "Call back within 24 hours" },
  { icon: "💳", text: "Flexible fee payment options" },
  { icon: "📚", text: "Study material from day 1" },
];

const CLASSES = ["6", "7", "8", "9", "10", "11", "12"];
const STREAMS = [
  "All Subjects",
  "Science (PCM)",
  "Science (PCB)",
  "Commerce",
  "Mathematics only",
  "English only",
];

type Step = 1 | 2 | 3;

export default function AdmissionForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    cls: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Student name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[+\d\s-]{8,15}$/.test(form.phone))
      newErrors.phone = "Enter a valid phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!form.cls) newErrors.cls = "Please select a class";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep2 = () => {
    if (validateStep1()) setStep(2);
  };

  const submit = () => {
    if (!validateStep2()) return;

    const phoneNumber = "919999902095";
    const message = `━━━━━━━━━━━━━━
📢 *New Admission Enquiry*
━━━━━━━━━━━━━━

👤 Name: ${form.name}
📞 Phone: ${form.phone}
🎓 Class: Class ${form.cls}
📘 Subject: ${form.subject || "Not specified"}

💬 Message: ${form.message || "N/A"}

🕒 Time: ${new Date().toLocaleString()}
`;
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
    setTimeout(() => setStep(3), 500);
  };

  const reset = () => {
    setForm({ name: "", phone: "", cls: "", subject: "", message: "" });
    setErrors({});
    setStep(1);
  };

  const inputClass = (field: string) =>
    `w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors ${
      errors[field]
        ? "border-red-400 bg-red-50"
        : "border-slate-200 hover:border-slate-300"
    }`;

  return (
    <section ref={ref} className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* ── Left: Info panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-blue-600 font-bold text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full mb-4">
              Admissions Open
            </span>
            <h3 className="text-4xl font-extrabold text-slate-800 mb-3 leading-tight">
              Apply for Admission
            </h3>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Fill in the form and our team will contact you within 24 hours to
              confirm your batch.
            </p>

            <div className="space-y-3 mb-8">
              {PERKS.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-sm flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-slate-700 text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1">
                Call us directly
              </p>
              <a
                href="tel:+919999902095"
                className="text-blue-600 font-extrabold text-xl hover:text-blue-700"
              >
                +91 99999 02095
              </a>
            </div>
          </motion.div>

          {/* ── Right: Form card ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="bg-white border border-slate-100 rounded-2xl shadow-md overflow-hidden">

              {/* Step indicator */}
              {step !== 3 && (
                <div className="px-8 pt-6 pb-4">
                  <div className="flex items-center">
                    {[
                      { n: 1, label: "Details" },
                      { n: 2, label: "Course" },
                    ].map(({ n, label }, idx) => (
                      <div key={n} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              step > n
                                ? "bg-green-500 text-white"
                                : step === n
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {step > n ? "✓" : n}
                          </div>
                          <span
                            className={`text-xs font-medium ${
                              step === n ? "text-blue-600" : "text-slate-400"
                            }`}
                          >
                            {label}
                          </span>
                        </div>
                        {idx === 0 && (
                          <div
                            className={`flex-1 h-px mx-2 mb-4 transition-colors ${
                              step > 1 ? "bg-green-400" : "bg-slate-200"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-slate-100" />

              <div className="p-8">
                <AnimatePresence mode="wait">

                  {/* ── Step 1: Personal Info ── */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Student information
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                            Student Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="name"
                            type="text"
                            placeholder="Enter full name"
                            value={form.name}
                            onChange={handle}
                            className={inputClass("name")}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                            Parent's Phone <span className="text-red-500">*</span>
                          </label>
                          <input
                            name="phone"
                            type="tel"
                            placeholder="+91 00000 00000"
                            value={form.phone}
                            onChange={handle}
                            className={inputClass("phone")}
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={goToStep2}
                        className="w-full mt-6 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-blue-100"
                      >
                        Next — Choose Course →
                      </button>
                    </motion.div>
                  )}

                  {/* ── Step 2: Course Details ── */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                        Course details
                      </p>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                              Class <span className="text-red-500">*</span>
                            </label>
                            <select
                              name="cls"
                              value={form.cls}
                              onChange={handle}
                              className={inputClass("cls")}
                            >
                              <option value="">Select</option>
                              {CLASSES.map((c) => (
                                <option key={c} value={c}>
                                  Class {c}
                                </option>
                              ))}
                            </select>
                            {errors.cls && (
                              <p className="text-red-500 text-xs mt-1">{errors.cls}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                              Stream
                            </label>
                            <select
                              name="subject"
                              value={form.subject}
                              onChange={handle}
                              className={inputClass("subject")}
                            >
                              <option value="">Select</option>
                              {STREAMS.map((s) => (
                                <option key={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1.5">
                            Message{" "}
                            <span className="text-slate-400 normal-case font-normal">
                              (optional)
                            </span>
                          </label>
                          <textarea
                            name="message"
                            value={form.message}
                            onChange={handle}
                            rows={3}
                            placeholder="Any specific queries or requirements..."
                            className="w-full border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => setStep(1)}
                          className="px-5 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 active:scale-[0.98] transition-all duration-150"
                        >
                          ← Back
                        </button>
                        <button
                          onClick={submit}
                          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:bg-[#20bc5a] active:scale-[0.98] transition-all duration-150 shadow-lg shadow-green-100"
                        >
                          {/* WhatsApp icon */}
                          <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.537 4.07 1.478 5.793L0 24l6.419-1.455A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.009-1.372l-.36-.213-3.818.864.88-3.726-.234-.382A9.818 9.818 0 1112 21.818z" />
                          </svg>
                          Send via WhatsApp
                        </button>
                      </div>
                      <p className="text-center text-slate-400 text-xs mt-3">
                        Opens WhatsApp with your enquiry pre-filled
                      </p>
                    </motion.div>
                  )}

                  {/* ── Step 3: Success ── */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-6"
                    >
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">🎉</span>
                      </div>
                      <h4 className="text-2xl font-extrabold text-slate-800 mb-2">
                        Application Received!
                      </h4>
                      <p className="text-slate-500 mb-6">
                        We'll call you on{" "}
                        <strong className="text-slate-700">{form.phone}</strong> within
                        24 hours to schedule your free demo class.
                      </p>
                      <button
                        onClick={reset}
                        className="text-sm text-blue-600 font-bold hover:text-blue-700 underline underline-offset-2"
                      >
                        Submit another enquiry
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}