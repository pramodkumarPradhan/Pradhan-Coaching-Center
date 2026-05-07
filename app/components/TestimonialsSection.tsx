"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface GoogleReviewProps {
  name: string;
  avatarLetter: string;
  avatarColor: string;
  timeAgo: string;
  rating: number;
  text: string;
  delay: number;
}

function GoogleReviewCard({ name, avatarLetter, avatarColor, timeAgo, rating, text, delay }: GoogleReviewProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col gap-4 relative"
    >
      {/* Google Logo Icon */}
      <div className="absolute top-6 right-6">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        </svg>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-full text-white flex items-center justify-center font-bold text-lg ${avatarColor}`}>
          {avatarLetter}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 text-[15px] leading-tight">{name}</h4>
          <p className="text-gray-500 text-xs mt-0.5">{timeAgo}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5 text-[#fbbc04]">
        {[...Array(5)].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-[14px] leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Pramod Ku. Pradhan",
      avatarLetter: "P",
      avatarColor: "bg-blue-600",
      timeAgo: "2 weeks ago",
      rating: 5,
      text: "One of the best coaching institutes! Teachers explain concepts very clearly and are very supportive. My confidence and marks both improved a lot.",
    },
    {
      name: "Alisha Biswal",
      avatarLetter: "A",
      avatarColor: "bg-purple-600",
      timeAgo: "2 weeks ago",
      rating: 5,
      text: "This coaching in TehKhand has very good faculty members with all basic facilities. 👍👍👍👍",
    },
    {
      name: "Raj Kumar",
      avatarLetter: "R",
      avatarColor: "bg-pink-600",
      timeAgo: "2 weeks ago",
      rating: 5,
      text: "Best institute for startup students Excellent facilities and I meet the owner many times he always give me good suggestions in my favour actually he is a very good person so pls join this institute for better future with shining",
    },
    {
      name: "Riya",
      avatarLetter: "R",
      avatarColor: "bg-teal-600",
      timeAgo: "2 weeks ago",
      rating: 5,
      text: "Pradhan coaching centre is a great place to study teachers of the centre always ensure that the students doubts are cleared and they encourage students to do there best for studies",
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header section like Google */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-16">
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-extrabold text-slate-900 mb-4">Excellent</h3>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="flex gap-1 text-[#fbbc04]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-gray-600 font-medium text-lg flex items-center justify-center md:justify-start gap-2">
              Based on <span className="font-bold underline">30+ reviews</span> on 
              <span className="flex items-center ml-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 relative top-[-1px]">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span className="font-semibold text-gray-800 ml-1">Google</span>
              </span>
            </p>
          </div>
          
          <a
            href="https://www.google.com/search?q=Pradhan+Coaching+Center+Tekhand"
            target="_blank"
            rel="noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)]"
          >
            Review us on Google
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <GoogleReviewCard key={i} {...r} delay={i * 0.15} />
          ))}
        </div>

      </div>
    </section>
  );
}