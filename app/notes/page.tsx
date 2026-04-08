"use client";
import { useState } from "react";

export default function DownloadsPage() {
  const [openClass, setOpenClass] = useState<number | null>(1);

  const data = [
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
    },
  ];

  const toggleClass = (index: number) => {
    setOpenClass(openClass === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            📚 Supporting Materials
          </h1>
          <p className="text-gray-500 mt-3">
            View or download class-wise study materials
          </p>
        </div>

        {/* Classes */}
        <div className="space-y-5">
          {data.map((cls, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg border">

              {/* Class Header */}
              <button
                onClick={() => toggleClass(i)}
                className="w-full flex justify-between items-center px-6 py-4 text-lg font-semibold text-gray-800 bg-gradient-to-r from-blue-50 to-indigo-50"
              >
                {cls.class} Materials
                <span>{openClass === i ? "−" : "+"}</span>
              </button>

              {/* Subjects */}
              {openClass === i && (
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {cls.subjects.map((sub, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-4 bg-white hover:shadow-md transition"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="text-2xl">{sub.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {sub.name}
                          </h3>
                          <p className="text-xs text-gray-600">
                            {sub.size}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <a
                          href={sub.url}
                          target="_blank"
                          className="flex-1 text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm"
                        >
                          View
                        </a>

                        {/* <a
                          href={sub.url}
                          download
                          className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
                        >
                          Download
                        </a> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-400 text-sm">
          © {new Date().getFullYear()} Pradhan Coaching Center
        </div>
      </div>
    </div>
  );
}