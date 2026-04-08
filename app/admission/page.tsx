"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface FormState {
  name: string;
  className: string;
  phone: string;
  parentName: string;
  subject: string;
}

type Status = "idle" | "loading" | "success" | "error";

const CLASSES = ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];
const SUBJECTS = ["Mathematics", "Science", "English", "Social Studies", "All Subjects"];

// ── Floating label input ───────────────────────────────────────────
function Field({
  label,
  type = "text",
  value,
  onChange,
  required = true,
  pattern,
  hint,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  pattern?: string;
  hint?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
          active
            ? "top-2 text-[10px] font-bold uppercase tracking-widest text-blue-600"
            : "top-3.5 text-sm text-slate-400"
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        pattern={pattern}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 pt-6 pb-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
      />
      {hint && focused && (
        <p className="text-[11px] text-slate-400 mt-1 ml-1">{hint}</p>
      )}
    </div>
  );
}

// ── Select field ───────────────────────────────────────────────────
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const active = value.length > 0;
  return (
    <div className="relative">
      <label
        className={`absolute left-4 transition-all duration-200 pointer-events-none z-10 ${
          active
            ? "top-2 text-[10px] font-bold uppercase tracking-widest text-blue-600"
            : "top-3.5 text-sm text-slate-400"
        }`}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 pt-6 pb-2.5 text-sm text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 appearance-none"
      >
        <option value="" disabled />
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span className="absolute right-4 top-4 text-slate-400 pointer-events-none">▾</span>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────
export default function AdmissionPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    className: "",
    phone: "",
    parentName: "",
    subject: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (key: keyof FormState) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/admission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", className: "", phone: "", parentName: "", subject: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection.");
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {/* ── Top banner ── */}
      <div className="bg-blue-700 text-white py-16 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2"
        >
          Pradhan Coaching Center
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold mb-3"
        >
          Admission Form
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-blue-200 text-sm"
        >
          Fill in the details below and we'll get back to you shortly
        </motion.p>
      </div>

      {/* ── Form card ── */}
      <div className="max-w-xl mx-auto px-6 -mt-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              // ── Success state ──
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-10"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
                  🎉
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 mb-2">
                  Application Submitted!
                </h2>
                <p className="text-slate-500 text-sm mb-8">
                  Thank you! We've received your application and will contact you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-blue-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              // ── Form ──
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Field
                  label="Student Name"
                  value={form.name}
                  onChange={set("name")}
                />
                <Field
                  label="Parent / Guardian Name"
                  value={form.parentName}
                  onChange={set("parentName")}
                />
                <SelectField
                  label="Class"
                  value={form.className}
                  onChange={set("className")}
                  options={CLASSES}
                />
                <SelectField
                  label="Subject(s)"
                  value={form.subject}
                  onChange={set("subject")}
                  options={SUBJECTS}
                />
                <Field
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={set("phone")}
                  pattern="[6-9][0-9]{9}"
                  hint="Enter 10-digit Indian mobile number"
                />

                {/* Error message */}
                <AnimatePresence>
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl"
                    >
                      ⚠️ {errorMsg}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-amber-400 text-slate-900 font-extrabold py-3.5 rounded-xl hover:bg-amber-300 transition-colors duration-200 shadow-md shadow-amber-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-700/30 border-t-slate-700 rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application →"
                  )}
                </button>

                <p className="text-center text-xs text-slate-400">
                  By submitting, you agree to be contacted by Pradhan Coaching Center.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 grid grid-cols-3 gap-4 text-center"
        >
          {[
            { icon: "📞", text: "We call within 24hrs" },
            { icon: "📚", text: "Classes for 6–12" },
            { icon: "🏆", text: "95% success rate" },
          ].map(({ icon, text }) => (
            <div key={text} className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-xs text-slate-500 font-semibold">
              <div className="text-xl mb-1">{icon}</div>
              {text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm">
        © 2026 Pradhan Coaching Center, Tekhand · All rights reserved.
      </footer>
    </div>
  );
}