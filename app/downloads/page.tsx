"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DownloadsPage() {
  const [openClass, setOpenClass] = useState<number | null>(0);
  const [openBook, setOpenBook] = useState<number | null>(0);

  // 📊 NEW FORMULA SECTION
  const formulas = [
    {
      name: "Mathematics Formulas (Ch 1, 2, 3 & Mensuration)",
      icon: "📐",
      url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Mathematics%20Formula%20Class%209th%20Chapter%201%20%2C2%20%2C3%20And%20Mensuration_watermark%20(1).pdf",
    }
    // ,
    // {
    //   name: "Change of Number (Singular to Plural)",
    //   icon: "🔤",
    //   url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/FORMULA/Change%20The%20Number%20(%20Singular%20....%20Plural)-stamped.pdf",
    // },
    // {
    //   name: "Determiners",
    //   icon: "📘",
    //   url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/FORMULA/Determiners%20_watermark.pdf",
    // },
  ];

  const data = [
    {
      class: "Class 9",
      slug: "class-9",
      subjects: [
        { name: "English", icon: "📘", size: "-", url: "#" },
        { name: "Mathematics", icon: "📐", size: "-", url: "#" },
        { name: "Science", icon: "🔬", size: "-", url: "#" },
        { name: "Social Science", icon: "🌍", size: "-", url: "#" },
      ],
    },
    {
      class: "Class 10",
      slug: "class-10",
      subjects: [
        {
          name: "English",
          icon: "📘",
          size: "102 MB",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Class10_2025_2026_English.pdf",
        },
        {
          name: "Mathematics",
          icon: "📐",
          size: "79 MB",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Class10_2025_2026_Mathematics_English_Medium.pdf",
        },
        {
          name: "Science",
          icon: "🔬",
          size: "100 MB",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Class10_2025_2026_Science_English_Medium.pdf",
        },
      ],
    },
  ];

  const booksData = [
    {
      title: "Class 9 English Book",
      chapters: [
        {
          name: "Chapter 1 (Part I)",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/CLASS%209%20ENGLISH%20(KAVERI)/Class%209th%20English%20Chapter%201%20(I).pdf",
        },
        {
          name: "Chapter 1 (Part II)",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/CLASS%209%20ENGLISH%20(KAVERI)/class%209%20chap%201(II).pdf",
        },
        {
          name: "Chapter 2 (Part I)",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/CLASS%209%20ENGLISH%20(KAVERI)/class%209%20chap%202(I).pdf",
        },
        {
          name: "Chapter 2 (Part II)",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/CLASS%209%20ENGLISH%20(KAVERI)/class%209%20chap%202(II).pdf",
        },
      ],
    },
    {
      title: "Class 9 Science Book",
      chapters: [
        {
          name: "Exploration Entering the world of secondary science",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Science/Exploration%20Entering%20the%20world%20of%20secondary%20science.pdf",
        },
        {
          name: "Describing Motion Around us",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Science/Describing%20Motion%20Around%20us.pdf",
        },
        {
          name: "Exploration Mixture and their Separation",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Science/Exploration%20Mixture%20and%20their%20Separation.pdf",
        }
      ],
    }
  ];

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const allowed = ["class-9", "class-10"];

    if (hash && allowed.includes(hash)) {
      const index = data.findIndex((d) => d.slug === hash);
      if (index !== -1) {
        setOpenClass(index);
      }
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617]">

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[120px] top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600/30 blur-[120px] bottom-[-100px] right-[-100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">

        {/* HEADER */}
        <h1 className="text-5xl font-extrabold text-center text-white mb-14">
          📚 Study Resources
        </h1>

         {/* 📊 FORMULAS SECTION */}
        <h2 className="text-2xl text-white mt-10 mb-6">
          📊 Formulas
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {formulas.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.03 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-xl"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="text-white mb-4">{item.name}</h3>

              <a
                href={item.url}
                target="_blank"
                className="block text-center bg-gradient-to-r from-green-400 to-emerald-500 text-white py-2 rounded-lg"
              >
                View
              </a>
            </motion.div>
          ))}
        </div>

        {/* 📖 BOOKS */}
        <h2 className="text-2xl text-white mb-6">📖 Books</h2>

        {booksData.map((book, i) => (
          <div key={i} className="mb-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">

              <button
                onClick={() => setOpenBook(openBook === i ? null : i)}
                className="w-full px-6 py-5 flex justify-between text-white"
              >
                {book.title}
                <span>{openBook === i ? "−" : "+"}</span>
              </button>

              <AnimatePresence>
                {openBook === i && (
                  <motion.div className="p-6 grid sm:grid-cols-2 gap-4">
                    {book.chapters.map((chap, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-white/5">
                        <h3 className="text-white mb-3">{chap.name}</h3>
                        <a href={chap.url} target="_blank"
                          className="block text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg">
                          View
                        </a>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        ))}

        {/* 🎓 SUPPORTING MATERIAL */}
        <h2 className="text-2xl text-white mt-10 mb-6">
          🎓 Supporting Materials
        </h2>

        {data.map((cls, i) => (
          <div key={i} className="mb-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl">

              <button
                onClick={() => setOpenClass(openClass === i ? null : i)}
                className="w-full px-6 py-5 flex justify-between text-white"
              >
                {cls.class}
                <span>{openClass === i ? "−" : "+"}</span>
              </button>

              <AnimatePresence>
                {openClass === i && (
                  <motion.div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cls.subjects.map((sub, idx) => (
                      <div key={idx} className="p-5 rounded-xl bg-white/5">
                        <div className="text-2xl mb-2">{sub.icon}</div>
                        <h3 className="text-white mb-2">{sub.name}</h3>

                        <a
                          href={sub.url}
                          target="_blank"
                          className={`block text-center py-2 rounded-lg ${
                            sub.url === "#"
                              ? "bg-gray-500 text-gray-300"
                              : "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                          }`}
                        >
                          {sub.url === "#" ? "Coming Soon" : "View"}
                        </a>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        ))}

        {/* FOOTER */}
        <div className="text-center text-gray-400 mt-16 text-sm">
          © {new Date().getFullYear()} Pradhan Coaching Center
        </div>

      </div>
    </div>
  );
}