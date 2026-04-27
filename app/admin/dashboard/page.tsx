"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function AdminDashboard() {
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Supporting Material");
  const [classLevel, setClassLevel] = useState("Class 10");
  const [subject, setSubject] = useState("");
  const [icon, setIcon] = useState("📘");

  const fetchMaterials = async () => {
    try {
      const res = await fetch("/api/materials");
      const data = await res.json();
      if (data.success) {
        setMaterials(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this material?")) return;
    try {
      const res = await fetch(`/api/materials/${id}`, { method: "DELETE" });
      if (res.ok) fetchMaterials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);

    try {
      // 1. Get Presigned URL
      const presignRes = await fetch("/api/materials/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || "application/pdf",
        }),
      });
      const presignData = await presignRes.json();

      if (!presignData.success) {
        throw new Error(presignData.error || "Failed to get upload URL");
      }

      const { signedUrl, fileUrl } = presignData.data;

      // 2. Upload file directly to Cloudflare R2
      const uploadRes = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type || "application/pdf",
        },
        body: file,
      });

      if (!uploadRes.ok) {
        throw new Error("Failed to upload file directly to storage");
      }

      // 3. Save metadata to MongoDB
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2) + " MB";

      const dbRes = await fetch("/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          category,
          classLevel,
          subject,
          icon,
          size: sizeInMB,
          fileUrl,
        }),
      });

      const dbData = await dbRes.json();

      if (dbData.success) {
        alert("Uploaded successfully!");
        setFile(null);
        setTitle("");
        setSubject("");
        fetchMaterials();
      } else {
        throw new Error(dbData.error || "Failed to save file information");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-pink-100 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-xl p-6 md:p-10 rounded-[2.5rem] shadow-2xl shadow-purple-200/50 border border-white">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-10 border-b border-purple-100 pb-6 text-center md:text-left">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Admin Dashboard
            </h1>
            <p className="text-purple-800/70 mt-2 font-bold tracking-wide">Manage your educational resources</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-all font-bold shadow-lg shadow-red-500/30 hover:scale-105"
          >
            Log Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:items-start">
          {/* Upload Form */}
          <div className="col-span-1 bg-white p-6 md:p-8 rounded-[2rem] border border-purple-100 shadow-xl shadow-purple-100 lg:sticky lg:top-10 h-fit">
            <h2 className="text-2xl font-extrabold mb-6 text-purple-900 flex items-center gap-2">
              <span className="text-3xl">☁️</span> Upload Resource
            </h2>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-medium"
                >
                  <option value="Formula">Formula</option>
                  <option value="Supporting Material">Supporting Material</option>
                  <option value="Book">Book</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Class</label>
                <select
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-medium"
                >
                  <option value="Class 6 & 7">Class 6 & 7</option>
                  <option value="Class 8">Class 8</option>
                  <option value="Class 9">Class 9</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject / Chapter Title</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Science, Mathematics..."
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Display Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Science (English Medium)"
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Icon (Emoji)</label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="e.g. 📘"
                  className="w-full p-3 bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 rounded-xl outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">PDF File</label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full p-3 border border-gray-300 text-gray-900 rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-purple-500 font-medium cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-extrabold p-4 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-500/40 hover:scale-105 disabled:opacity-50 mt-6 text-lg"
              >
                {loading ? "Uploading..." : "Upload File"}
              </button>
            </form>
          </div>

          {/* List of Materials */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-extrabold mb-6 text-purple-900">Uploaded Materials</h2>
            {fetching ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-purple-500 font-bold animate-pulse text-lg">Fetching resources...</p>
              </div>
            ) : materials.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-purple-100 shadow-lg">
                <p className="text-gray-500 font-bold text-lg">No materials uploaded yet. Your uploads will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {materials.map((mat) => (
                  <div key={mat._id} className="bg-white border-2 border-purple-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-purple-200 transition-all flex flex-col justify-between group">
                    <div className="mb-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-xs font-black uppercase tracking-widest text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1.5 rounded-lg shadow-sm">
                          {mat.category}
                        </span>
                        <span className="text-xs font-black text-white bg-slate-800 px-3 py-1.5 rounded-lg shadow-sm">
                          {mat.class}
                        </span>
                      </div>
                      <h3 className="font-extrabold text-gray-900 text-xl flex items-start gap-3 mt-4 leading-tight">
                        <span className="text-2xl">{mat.icon}</span> 
                        <span>{mat.title}</span>
                      </h3>
                      <p className="text-sm font-bold text-purple-500 mt-2">{mat.size}</p>
                    </div>
                    
                    <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
                      <a 
                        href={mat.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex-1 text-center text-sm font-extrabold text-white bg-blue-500 hover:bg-blue-600 py-3 rounded-xl transition-all shadow-md hover:shadow-blue-500/40 hover:-translate-y-1"
                      >
                        View
                      </a>
                      <button
                        onClick={() => handleDelete(mat._id)}
                        className="flex-1 text-center text-sm font-extrabold text-white bg-red-500 hover:bg-red-600 py-3 rounded-xl transition-all shadow-md hover:shadow-red-500/40 hover:-translate-y-1"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
