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

// "use client";

// import { useEffect, useState, useRef } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const navItems = [
//   { name: "Home", id: "home" },
//   { name: "Courses", id: "courses" },
//   { name: "Notes", link: "/notes" },
//   { name: "Contact", id: "contact" },
// ];

// export default function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [active, setActive] = useState("home");
//   const [scrolled, setScrolled] = useState(false);
//   const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
//   const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
//   const pathname = usePathname();

//   // Scroll spy + scroll shadow
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//       navItems.forEach((item) => {
//         if (!item.id) return;
//         const section = document.getElementById(item.id);
//         if (section) {
//           const top = section.offsetTop - 120;
//           const bottom = top + section.offsetHeight;
//           if (window.scrollY >= top && window.scrollY < bottom) {
//             setActive(item.id);
//           }
//         }
//       });
//     };
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Sliding pill indicator
//   useEffect(() => {
//     const activeIndex = navItems.findIndex((item) =>
//       item.link ? pathname === item.link : active === item.id
//     );
//     const el = navRefs.current[activeIndex];
//     if (el) {
//       setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
//     }
//   }, [active, pathname]);

//   return (
//     <header
//       className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
//           ? "bg-white/80 backdrop-blur-2xl shadow-[0_1px_40px_rgba(0,0,0,0.08)]"
//           : "bg-transparent"
//         }`}
//     >
//       <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-[68px]">

//         {/* Logo */}
//         <a href="#home" className="flex items-center gap-2.5 group select-none">
//           <div className="relative w-9 h-9 flex-shrink-0">
//             <div className="absolute inset-0 bg-blue-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
//             <div className="absolute inset-0 bg-indigo-500 rounded-xl -rotate-3 opacity-60 group-hover:-rotate-6 transition-transform duration-300" />
//             <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-lg">
//               P
//             </div>
//           </div>
//           <div className="flex flex-col leading-none">
//             <span className="text-[25px] font-extrabold tracking-tight text-grey-900">
//               Pradhan
//             </span>
//             <span className="text-[16px] font-semibold text-slate-500 tracking-[0.15em] uppercase">
//               Coaching
//             </span>
//           </div>
//         </a>

//         {/* Desktop nav */}
//         <nav className="hidden md:flex items-center gap-1 relative">
//           {/* Sliding background pill */}
//           <span
//             className="absolute top-1/2 -translate-y-1/2 h-9 bg-blue-50 rounded-xl transition-all duration-300 ease-[cubic-bezier(.4,0,.2,1)] pointer-events-none"
//             style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
//           />

//           {navItems.map((item, i) => {
//             const isActive = item.link ? pathname === item.link : active === item.id;
//             const commonClass = `relative z-10 px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 ${isActive ? "text-blue-600" : "text-slate-600 hover:text-slate-900"
//               }`;

//             return item.link ? (
//               <Link
//                 key={i}
//                 href={item.link}
//                 ref={(el) => { navRefs.current[i] = el; }}
//                 className={commonClass}
//               >
//                 {item.name}
//               </Link>
//             ) : (
//               <a
//                 key={i}
//                 href={`#${item.id}`}
//                 ref={(el) => { navRefs.current[i] = el; }}
//                 className={commonClass}
//               >
//                 {item.name}
//               </a>
//             );
//           })}

//           {/* CTA */}
//           <a
//             href="#admission"
//             className="ml-3 relative inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl overflow-hidden group shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-shadow duration-300"
//           >
//             <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//             <span className="relative">Enroll Now</span>
//             <svg className="relative w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth={2.5}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M1 7h12M8 2l5 5-5 5" />
//             </svg>
//           </a>
//         </nav>

//         {/* Mobile hamburger */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden relative w-9 h-9 flex flex-col justify-center items-center gap-[5px]"
//           aria-label="Toggle menu"
//         >
//           <span className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
//           <span className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
//           <span className={`block w-5 h-0.5 bg-slate-700 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
//         </button>
//       </div>

//       {/* Mobile menu */}
//       <div
//         className={`md:hidden transition-all duration-400 ease-[cubic-bezier(.4,0,.2,1)] overflow-hidden ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
//           }`}
//       >
//         <div className="bg-white/95 backdrop-blur-2xl border-t border-slate-100 px-5 py-4 flex flex-col gap-1">
//           {navItems.map((item, i) => {
//             const isActive = item.link ? pathname === item.link : active === item.id;
//             const commonClass = `px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive
//                 ? "bg-blue-50 text-blue-600"
//                 : "text-slate-700 hover:bg-slate-50"
//               }`;
//             return item.link ? (
//               <Link key={i} href={item.link} onClick={() => setMenuOpen(false)} className={commonClass}>
//                 {item.name}
//               </Link>
//             ) : (
//               <a key={i} href={`#${item.id}`} onClick={() => setMenuOpen(false)} className={commonClass}>
//                 {item.name}
//               </a>
//             );
//           })}

//           <a
//             href="#admission"
//             onClick={() => setMenuOpen(false)}
//             className="mt-2 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-sm py-3 rounded-xl shadow-md shadow-blue-100"
//           >
//             Enroll Now
//             <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 14 14" stroke="currentColor" strokeWidth={2.5}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M1 7h12M8 2l5 5-5 5" />
//             </svg>
//           </a>
//         </div>
//       </div>
//     </header>
//   );
// }