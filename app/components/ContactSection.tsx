"use client";

import Link from "next/link";

export default function ContactSection() {
  const contacts = [
    { icon: "📍", label: "Address", val: "Tekhand, New Delhi, India" },
    { icon: "📞", label: "Phone", val: "+91 99999 02095" },
    { icon: "✉", label: "Email", val: "radharanicoaching@email.com" },
  ];

  return (
    <section className="bg-blue-700 text-white py-20">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h3 className="text-4xl font-extrabold mb-4">Ready to Join?</h3>
        <p className="text-blue-200 mb-10 text-lg">
          Visit us or get in touch — we're happy to help you find the right batch.
        </p>

        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {contacts.map(({ icon, label, val }) => (
            <div key={label} className="bg-white/10 rounded-2xl p-6 text-center">
              <div className="text-3xl mb-2">{icon}</div>
              <p className="text-xs uppercase tracking-widest text-blue-200 mb-1">{label}</p>
              <p className="font-semibold text-sm">{val}</p>
            </div>
          ))}
        </div>

        <Link
          href="/admission"
          className="inline-block bg-amber-400 text-slate-900 font-bold px-10 py-3.5 rounded-xl hover:bg-amber-300 transition-colors duration-200 shadow-lg"
        >
          Apply for Admission →
        </Link>
      </div>
    </section>
  );
}