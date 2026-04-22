"use client";
import { useState, useEffect } from "react";

interface Material {
  _id: string;
  title: string;
  category: string;
  class: string;
  subject: string;
  size: string;
  url: string;
  icon: string;
}

export default function DownloadsPage() {
  const [openClass, setOpenClass] = useState<number | null>(1);
  const [openBook, setOpenBook] = useState<number | null>(0);
  const [dynamicMaterials, setDynamicMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await fetch("/api/materials");
        const data = await res.json();
        if (data.success) {
          setDynamicMaterials(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch materials", err);
      }
    };
    fetchMaterials();
  }, []);

  const staticData = [
    {
      class: "Class 9",
      subjects: [
        { name: "English", icon: "📘", size: "-", url: "#" },
        { name: "Mathematics", icon: "📐", size: "-", url: "#" },
        { name: "Science", icon: "🔬", size: "-", url: "#" },
        { name: "Social Science", icon: "🌍", size: "-", url: "#" },
      ],
    },
    {
      class: "Class 10",
      subjects: [
        {
          name: "English",
          icon: "📘",
          size: "102 MB",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Class10_2025_2026_English.pdf",
        },
        {
          name: "Mathematics (English Medium)",
          icon: "📐",
          size: "79 MB",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Class10_2025_2026_Mathematics_English_Medium.pdf",
        },
        {
          name: "Mathematics (Hindi Medium)",
          icon: "📐",
          size: "59 MB",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Class10_2025_2026_Mathematics_Hindi_Medium.pdf",
        },
        {
          name: "Science (English Medium)",
          icon: "🔬",
          size: "100 MB",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Class10_2025_2026_Science_English_Medium.pdf",
        },
        {
          name: "Science (Hindi Medium)",
          icon: "🔬",
          size: "49 MB",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Class10_2025_2026_Science_Hindi_Medium.pdf",
        },
        {
          name: "Social Science (English Medium)",
          icon: "🌍",
          size: "93 MB",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Class10_2025_2026_Social_Science_English_Medium.pdf",
        },
        {
          name: "Social Science (Hindi Medium)",
          icon: "🌍",
          size: "55 MB",
          url: "https://pub-478bcf1c8ef5411fbc3b76fb27883c64.r2.dev/Class10_2025_2026_Social_Science_Hindi_Medium.pdf",
        },
      ],
    },
    {
      class: "Class 11",
      subjects: [
        { name: "Physics", icon: "⚛️", size: "-", url: "#" },
        { name: "Chemistry", icon: "🧪", size: "-", url: "#" },
      ],
    },
    {
      class: "Class 12",
      subjects: [
        { name: "Physics", icon: "⚛️", size: "-", url: "#" },
        { name: "Biology", icon: "🧬", size: "-", url: "#" },
      ],
    }
  ];

  const staticBooksData = [
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
  ];

  // Merge static data with dynamic materials
  const combinedData = [...staticData];
  const combinedBooksData = [...staticBooksData];
  const dynamicFormulas: { class: string; subjects: any[] }[] = [];

  // Group dynamic materials
  dynamicMaterials.forEach(mat => {
    if (mat.category === "Formula") {
      const classIndex = dynamicFormulas.findIndex(c => c.class === mat.class);
      const newSubject = { name: mat.title, icon: mat.icon || "🧮", size: mat.size, url: mat.url };
      
      if (classIndex >= 0) {
        dynamicFormulas[classIndex].subjects.push(newSubject);
      } else {
        dynamicFormulas.push({ class: mat.class, subjects: [newSubject] });
      }
    } else if (mat.category === "Supporting Material") {
      const classIndex = combinedData.findIndex(c => c.class === mat.class);
      const newSubject = { name: mat.title, icon: mat.icon, size: mat.size, url: mat.url };
      
      if (classIndex >= 0) {
        combinedData[classIndex].subjects.push(newSubject);
      } else {
        combinedData.push({ class: mat.class, subjects: [newSubject] });
      }
    } else if (mat.category === "Book") {
      // Find book by class
      const bookTitle = `${mat.class} ${mat.subject}`;
      const bookIndex = combinedBooksData.findIndex(b => b.title === bookTitle);
      const newChapter = { name: mat.title, url: mat.url };

      if (bookIndex >= 0) {
        combinedBooksData[bookIndex].chapters.push(newChapter);
      } else {
        combinedBooksData.push({ title: bookTitle, chapters: [newChapter] });
      }
    }
  });

  // Sort dynamic formulas by class number
  dynamicFormulas.sort((a, b) => {
    const numA = parseInt(a.class.replace(/\D/g, '')) || 0;
    const numB = parseInt(b.class.replace(/\D/g, '')) || 0;
    return numA - numB;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 p-4 md:p-10">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Admin Quick Access Button */}
        <div className="flex justify-end mb-6">
          <a
            href="/admin"
            className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-slate-700 transition-all hover:-translate-y-1"
          >
            ⚙️ Upload Notes
          </a>
        </div>

        {/* ================= FORMULAS ================= */}
        {dynamicFormulas.length > 0 && (
          <div className="mb-14">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-emerald-600">
              🧮 Formulas
            </h2>
            <div className="space-y-6">
              {dynamicFormulas.map((cls, i) => (
                <div key={i} className="bg-white shadow-2xl rounded-3xl border">
                  <div className="w-full px-8 py-5 text-xl font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-t-3xl">
                    🎓 {cls.class}
                  </div>
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cls.subjects.map((sub, index) => (
                      <div
                        key={index}
                        className="bg-white border rounded-2xl p-5 shadow hover:shadow-xl transition hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-2xl">{sub.icon}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {sub.name}
                            </h3>
                            <p className="text-xs text-gray-500">{sub.size}</p>
                          </div>
                        </div>
                        <a
                          href={sub.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-center py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600"
                        >
                          View Formula
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= BOOKS ================= */}
        {combinedBooksData.length > 0 && (
          <>
            <h2 className="text-4xl font-extrabold text-center mb-8 text-purple-600">
              📖 Books
            </h2>

            {combinedBooksData.map((book, i) => (
              <div key={i} className="bg-white shadow-2xl rounded-3xl mb-10 border">

                <button
                  onClick={() => setOpenBook(openBook === i ? null : i)}
                  className="w-full flex justify-between items-center px-8 py-5 text-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-3xl"
                >
                  {book.title}
                  <span className="text-2xl">{openBook === i ? "−" : "+"}</span>
                </button>

                {openBook === i && (
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {book.chapters.map((chap, index) => (
                      <div
                        key={index}
                        className="bg-white border rounded-2xl p-5 shadow hover:shadow-xl transition hover:-translate-y-1"
                      >
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {chap.name}
                        </h3>

                        <a
                          href={chap.url}
                          target="_blank"
                          rel="noreferrer"
                          className="block text-center bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-xl"
                        >
                          View Chapter
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {/* ================= SUPPORTING MATERIAL ================= */}
        <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
          📚 Supporting Materials
        </h2>

        <div className="space-y-6">
          {combinedData.map((cls, i) => (
            <div key={i} className="bg-white shadow-2xl rounded-3xl border">

              <button
                onClick={() =>
                  setOpenClass(openClass === i ? null : i)
                }
                className="w-full flex justify-between items-center px-8 py-5 text-xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-3xl"
              >
                🎓 {cls.class}
                <span className="text-2xl">{openClass === i ? "−" : "+"}</span>
              </button>

              {openClass === i && (
                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cls.subjects.map((sub, index) => (
                    <div
                      key={index}
                      className="bg-white border rounded-2xl p-5 shadow hover:shadow-xl transition hover:-translate-y-1"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{sub.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {sub.name}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {sub.size}
                          </p>
                        </div>
                      </div>

                      <a
                        href={sub.url}
                        target="_blank"
                        rel="noreferrer"
                        className={`block text-center py-2 rounded-xl ${
                          sub.url === "#"
                            ? "bg-gray-300 text-gray-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                        }`}
                      >
                        {sub.url === "#" ? "Coming Soon" : "View"}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="text-center mt-14 pb-10 text-gray-500 text-sm">
          © {new Date().getFullYear()} Pradhan Coaching Center
        </div>
      </div>
    </div>
  );
}