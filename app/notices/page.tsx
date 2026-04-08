"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Notice {
  _id: string;
  title: string;
  message: string;
  createdAt: string;
}

function isNew(dateStr: string): boolean {
  const diff = Date.now() - new Date(dateStr).getTime();
  return diff < 1000 * 60 * 60 * 24 * 3; // within 3 days
}

// ── Skeleton loader ────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-md animate-pulse">
      <div className="h-4 bg-slate-200 rounded w-1/3 mb-3" />
      <div className="h-3 bg-slate-100 rounded w-full mb-2" />
      <div className="h-3 bg-slate-100 rounded w-5/6 mb-2" />
      <div className="h-3 bg-slate-100 rounded w-2/3" />
      <div className="h-3 bg-slate-100 rounded w-1/4 mt-4" />
    </div>
  );
}

// ── Notice card ────────────────────────────────────────────────────
function NoticeCard({ notice, index }: { notice: Notice; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const fresh = isNew(notice.createdAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.07, duration: 0.45 }}
      className="bg-white border border-slate-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {fresh && (
            <span className="bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full">
              New
            </span>
          )}
          <h2 className="text-base font-bold text-slate-800">{notice.title}</h2>
        </div>
        <span className="text-slate-400 text-lg flex-shrink-0">
          {expanded ? "▲" : "▼"}
        </span>
      </div>

      {/* Date */}
      <p className="text-xs text-slate-400 mt-1 mb-3 flex items-center gap-1">
        <span>📅</span>
        {new Date(notice.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {/* Message — collapsed preview or full */}
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.p
            key="full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-slate-600 text-sm leading-relaxed overflow-hidden"
          >
            {notice.message}
          </motion.p>
        ) : (
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {notice.message}
          </p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Main page ──────────────────────────────────────────────────────
export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await fetch("/api/notices");
      const result = await res.json();
      setNotices(Array.isArray(result.data) ? result.data : []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filtered = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen bg-slate-50"
      style={{ fontFamily: "'Nunito', 'Segoe UI', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');`}</style>

      {/* ── Top banner ── */}
      <div className="bg-blue-700 text-white py-16 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-2"
        >
          Pradhan Coaching Center
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          📌 Class Notices
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-blue-200 text-sm"
        >
          Stay updated with the latest announcements and updates
        </motion.p>
      </div>

      {/* ── Search bar ── */}
      <div className="max-w-4xl mx-auto px-6 -mt-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg flex items-center gap-3 px-5 py-3 border border-slate-100"
        >
          <span className="text-slate-400 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-slate-700 placeholder-slate-400 bg-transparent"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-slate-400 hover:text-slate-600 text-sm font-bold"
            >
              ✕
            </button>
          )}
        </motion.div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 pb-24">

        {/* Count label */}
        {!loading && !error && (
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mb-6">
            {filtered.length} {filtered.length === 1 ? "notice" : "notices"} found
          </p>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="text-slate-600 font-semibold mb-2">Failed to load notices</p>
            <p className="text-slate-400 text-sm mb-6">Please check your connection and try again.</p>
            <button
              onClick={() => { setError(false); setLoading(true); fetchNotices(); }}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-5xl mb-4">📭</p>
            <p className="text-slate-600 font-semibold mb-1">
              {search ? "No notices match your search" : "No notices yet"}
            </p>
            <p className="text-slate-400 text-sm">
              {search ? "Try a different keyword" : "Check back later for updates"}
            </p>
          </motion.div>
        )}

        {/* Notice list */}
        {!loading && !error && filtered.length > 0 && (
          <AnimatePresence>
            <div className="space-y-4">
              {filtered.map((notice, i) => (
                <NoticeCard key={notice._id} notice={notice} index={i} />
              ))}
            </div>
          </AnimatePresence>
        )}

      </div>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-sm">
        © 2026 Pradhan Coaching Center, Tekhand · All rights reserved.
      </footer>
    </div>
  );
}