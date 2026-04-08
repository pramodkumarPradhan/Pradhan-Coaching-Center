"use client";

import { useState } from "react";

export default function UploadNotes() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, subject, url }),
    });

    alert("Note uploaded ✅");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow w-[400px]">
      <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full mb-2" />
      <input placeholder="Subject" onChange={(e) => setSubject(e.target.value)} className="border p-2 w-full mb-2" />
      <input placeholder="PDF URL" onChange={(e) => setUrl(e.target.value)} className="border p-2 w-full mb-3" />

      <button onClick={handleUpload} className="bg-blue-600 text-white w-full py-2 rounded">
        Upload Note
      </button>
    </div>
  );
}