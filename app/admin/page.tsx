"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/30 rounded-full blur-[120px] mix-blend-screen" />

      <div className="relative bg-white/10 backdrop-blur-2xl p-10 rounded-[2rem] shadow-2xl w-full max-w-md border border-white/20 z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            Admin Portal
          </h1>
          <p className="text-slate-300 text-sm">Secure access to content management</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-300 font-medium mb-2 text-sm ml-1">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300"
              placeholder="Enter secure password..."
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold p-4 rounded-2xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-purple-500/25 disabled:opacity-50 hover:-translate-y-1"
          >
            {loading ? "Authenticating..." : "Secure Login →"}
          </button>
        </form>
      </div>
    </div>
  );
}
