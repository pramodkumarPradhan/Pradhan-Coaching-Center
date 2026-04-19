"use client";
import { motion } from "framer-motion";

export default function GallerySection() {
  const images = [
    "https://res.cloudinary.com/dlcjyh6fb/image/upload/v1774521929/classroom_image_ja0yft.jpg",
    "https://res.cloudinary.com/dlcjyh6fb/image/upload/v1776478044/rahul_bhai_class_edited_sdohac.jpg",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600"
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">
          Life at Pradhan
        </p>
        <h3 className="text-4xl font-extrabold text-slate-800">Our Classroom Moments</h3>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="overflow-hidden rounded-2xl shadow-lg group"
          >
            <img
              src={src}
              alt={`Classroom moment ${i + 1}`}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}