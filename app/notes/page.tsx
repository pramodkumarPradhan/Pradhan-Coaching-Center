"use client";

import { useEffect, useState } from "react";
import LoginModal from "../components/LoginModal";

export default function NotesPage() {
  const [user, setUser] = useState(true); // TEMP: assume logged in
  const [notes, setNotes] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchNotes = async () => {
      const res = await fetch("/api/notes");
      const data = await res.json();
      setNotes(data);
    };

    fetchNotes();
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
        <LoginModal />
      </div>
    );
  }

  const subjects = ["All", ...new Set(notes.map((n) => n.subject))];

  const filteredNotes = notes.filter((note) => {
    return (
      (filter === "All" || note.subject === filter) &&
      note.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6 md:p-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-slate-800">
          📚 Study Notes
        </h1>

        <div className="flex gap-3 w-full md:w-auto">
          <input
            placeholder="Search notes..."
            className="px-4 py-2 rounded-xl border w-full md:w-64 shadow-sm"
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-4 py-2 rounded-xl border shadow-sm"
            onChange={(e) => setFilter(e.target.value)}
          >
            {subjects.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredNotes.map((note, i) => (
          <div
            key={i}
            className="group bg-white/70 backdrop-blur-lg border border-white/30 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Icon */}
            <div className="text-4xl mb-3">📄</div>

            {/* Title */}
            <h2 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition">
              {note.title}
            </h2>

            {/* Subject */}
            <p className="text-sm text-gray-500 mb-3">
              {note.subject}
            </p>

            {/* Buttons */}
            <div className="flex gap-2 mt-3">
              <a
                href={note.url}
                target="_blank"
                className="flex-1 text-center bg-blue-600 text-white py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
              >
                View
              </a>

              <a
                href={note.url}
                download
                className="flex-1 text-center bg-green-600 text-white py-1.5 rounded-lg text-sm hover:bg-green-700 transition"
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredNotes.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No notes found 😢
        </p>
      )}
    </div>
  );
}