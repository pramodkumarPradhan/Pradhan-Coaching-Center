"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const pathname = usePathname();

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Notices", id: "notices" },
    { name: "Courses", id: "courses" },
    { name: "Notes", link: "/notes" }, // page route
    { name: "Contact", id: "contact" },
  ];

  // 🔥 Scroll Spy (ONLY for section links)
  useEffect(() => {
    const handleScroll = () => {
      navItems.forEach((item) => {
        if (!item.id) return; // skip /notes

        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop - 120;
          const bottom = top + section.offsetHeight;

          if (window.scrollY >= top && window.scrollY < bottom) {
            setActive(item.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <span className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition">
            P
          </span>
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            Pradhan Coaching
          </span>
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {navItems.map((item, index) => {
            const isActive =
              item.link
                ? pathname === item.link
                : active === item.id;

            return item.link ? (
              <Link
                key={index}
                href={item.link}
                className={`relative group ${isActive ? "text-blue-600" : ""}`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ) : (
              <a
                key={index}
                href={`#${item.id}`}
                className={`relative group ${isActive ? "text-blue-600" : ""}`}
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            );
          })}

          {/* CTA */}
          <a
            href="#admission"
            className="bg-gradient-to-r from-blue-600 to-indigo-500 text-white px-5 py-2 rounded-xl shadow-md hover:scale-105 transition"
          >
            Admission Now
          </a>
          
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-xl px-6 py-5 flex flex-col gap-5 text-sm font-medium text-slate-700">
          {navItems.map((item, index) =>
            item.link ? (
              <Link
                key={index}
                href={item.link}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ) : (
              <a
                key={index}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </a>
            )
          )}

          <a
            href="#admission"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
          >
            Admission Now
          </a>
        </div>
      </div>
    </header>
  );
}