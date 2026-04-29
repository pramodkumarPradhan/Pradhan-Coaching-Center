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
  const [activeTab, setActiveTab] = useState<"senior" | "junior">("senior");
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

  // Merge static data with dynamic materials
  const juniorClasses = ["Below 6 Class"];

  const combinedData = [...staticData];
  const combinedBooksData: { title: string; chapters: { name: string; url: string }[] }[] = [];
  const dynamicFormulas: { class: string; subjects: any[] }[] = [];

  const juniorCombinedData: { class: string; subjects: any[] }[] = [];
  const juniorCombinedBooksData: { title: string; chapters: { name: string; url: string }[] }[] = [];
  const juniorDynamicFormulas: { class: string; subjects: any[] }[] = [];

  // Group dynamic materials
  dynamicMaterials.forEach(mat => {
    const isJunior = juniorClasses.includes(mat.class);

    if (mat.category === "Formula") {
      const targetFormulas = isJunior ? juniorDynamicFormulas : dynamicFormulas;
      const classIndex = targetFormulas.findIndex(c => c.class === mat.class);
      const newSubject = { name: mat.title, icon: mat.icon || "🧮", size: mat.size, url: mat.url };
      
      if (classIndex >= 0) {
        targetFormulas[classIndex].subjects.push(newSubject);
      } else {
        targetFormulas.push({ class: mat.class, subjects: [newSubject] });
      }
    } else if (mat.category === "Supporting Material") {
      const targetData = isJunior ? juniorCombinedData : combinedData;
      const classIndex = targetData.findIndex(c => c.class === mat.class);
      const newSubject = { name: mat.title, icon: mat.icon, size: mat.size, url: mat.url };
      
      if (classIndex >= 0) {
        targetData[classIndex].subjects.push(newSubject);
      } else {
        targetData.push({ class: mat.class, subjects: [newSubject] });
      }
    } else if (mat.category === "Book") {
      // Find book by class
      const targetBooks = isJunior ? juniorCombinedBooksData : combinedBooksData;
      const bookTitle = `${mat.class} ${mat.subject}`;
      const bookIndex = targetBooks.findIndex(b => b.title === bookTitle);
      const newChapter = { name: mat.title, url: mat.url };

      if (bookIndex >= 0) {
        targetBooks[bookIndex].chapters.push(newChapter);
      } else {
        targetBooks.push({ title: bookTitle, chapters: [newChapter] });
      }
    }
  });

  // Sort all data by class number
  const extractClassNum = (str: string) => {
    const match = str.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  dynamicFormulas.sort((a, b) => extractClassNum(a.class) - extractClassNum(b.class));
  combinedData.sort((a, b) => extractClassNum(a.class) - extractClassNum(b.class));
  combinedBooksData.sort((a, b) => extractClassNum(a.title) - extractClassNum(b.title));

  juniorDynamicFormulas.sort((a, b) => extractClassNum(a.class) - extractClassNum(b.class));
  juniorCombinedData.sort((a, b) => extractClassNum(a.class) - extractClassNum(b.class));
  juniorCombinedBooksData.sort((a, b) => extractClassNum(a.title) - extractClassNum(b.title));

  const displayFormulas = activeTab === "senior" ? dynamicFormulas : juniorDynamicFormulas;
  const displayBooksData = activeTab === "senior" ? combinedBooksData : juniorCombinedBooksData;
  const displayCombinedData = activeTab === "senior" ? combinedData : juniorCombinedData;

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

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-white p-2 rounded-2xl shadow-lg border flex gap-2 w-full max-w-md">
            <button
              onClick={() => { setActiveTab("junior"); setOpenClass(null); setOpenBook(null); }}
              className={`flex-1 py-3 text-center rounded-xl font-bold transition-all ${
                activeTab === "junior"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Below 6 Class
            </button>
            <button
              onClick={() => { setActiveTab("senior"); setOpenClass(1); setOpenBook(0); }}
              className={`flex-1 py-3 text-center rounded-xl font-bold transition-all ${
                activeTab === "senior"
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Class 6 to 12
            </button>
          </div>
        </div>

        {/* Empty State Check */}
        {displayFormulas.length === 0 && displayBooksData.length === 0 && displayCombinedData.length === 0 && (
          <div className="text-center bg-white p-10 rounded-3xl shadow-xl border my-20">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No materials available yet</h3>
            <p className="text-gray-500">Check back later for updates to this section!</p>
          </div>
        )}

        {/* ================= FORMULAS ================= */}
        {displayFormulas.length > 0 && (
          <div className="mb-14">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-emerald-600">
              🧮 Formulas
            </h2>
            <div className="space-y-6">
              {displayFormulas.map((cls, i) => (
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
                  {["Class 8", "Class 9", "Class 10"].includes(cls.class) && (
                    <div className="bg-red-50/50 p-4 sm:p-5 border-t border-red-100 flex flex-col sm:flex-row justify-between items-center px-6 sm:px-8 gap-4 rounded-b-3xl">
                      <div className="text-red-800 font-medium text-sm sm:text-base text-center sm:text-left flex items-center gap-2">
                        <span className="text-2xl">📺</span> 
                        <span>For more questions and detailed video solutions, visit our YouTube channel!</span>
                      </div>
                      <a 
                        href="https://www.youtube.com/@radharanifreeeducation3647" 
                        target="_blank" 
                        rel="noreferrer"
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-md shadow-red-500/30 whitespace-nowrap"
                      >
                        ▶ Watch on YouTube
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= BOOKS ================= */}
        {displayBooksData.length > 0 && (
          <>
            <h2 className="text-4xl font-extrabold text-center mb-8 text-purple-600">
              📖 Books
            </h2>

            {displayBooksData.map((book, i) => (
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
        {displayCombinedData.length > 0 && (
          <>
            <h2 className="text-4xl font-extrabold text-center mb-8 text-blue-600">
              📚 Supporting Materials
            </h2>

            <div className="space-y-6">
              {displayCombinedData.map((cls, i) => (
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
          </>
        )}

        {/* FOOTER */}
        <div className="text-center mt-14 pb-10 text-gray-500 text-sm">
          © {new Date().getFullYear()} Pradhan Coaching Center
        </div>
      </div>
    </div>
  );
}