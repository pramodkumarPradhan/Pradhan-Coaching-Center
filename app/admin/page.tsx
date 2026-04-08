"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const [notes, setNotes] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [url, setUrl] = useState("");

  // 🔐 Login
  const handleLogin = async () => {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      setIsAdmin(true);
      fetchNotes();
    } else {
      alert("Wrong password ❌");
    }
  };

  // 📥 Fetch notes
  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  // ➕ Add note
  const addNote = async () => {
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, subject, url }),
    });

    setTitle("");
    setSubject("");
    setUrl("");
    fetchNotes();
  };

  // ❌ Delete note
  const deleteNote = async (id: string) => {
    await fetch(`/api/notes?id=${id}`, {
      method: "DELETE",
    });

    fetchNotes();
  };

  // 🔐 Login screen
  if (!isAdmin) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="bg-white p-8 rounded-xl shadow w-80">
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

          <input
            type="password"
            placeholder="Enter password"
            className="border p-2 w-full mb-3"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // 🎯 Dashboard UI
  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">👨‍🏫 Admin Dashboard</h1>

      {/* Add Note */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="font-bold mb-4">Add New Note</h2>

        <div className="grid md:grid-cols-3 gap-3">
          <input
            placeholder="Title"
            className="border p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            placeholder="Subject"
            className="border p-2"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            placeholder="PDF URL"
            className="border p-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <button
          onClick={addNote}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">All Notes</h2>

        <div className="space-y-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <div>
                <p className="font-semibold">{note.title}</p>
                <p className="text-sm text-gray-500">{note.subject}</p>
              </div>

              <div className="flex gap-2">
                <a
                  href={note.url}
                  target="_blank"
                  className="text-blue-600"
                >
                  View
                </a>

                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}