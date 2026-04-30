"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ImageGallery() {
  const galleryItems = [
    { id: 1, src: "/images/aboutpage.webp", title: "Signature Fire-Baked", size: "tall", category: "Food" },
    { id: 2, src: "/images/reception.jpeg", title: "Reception", size: "wide", category: "Interior" },
    { id: 3, src: "/images/peri peri pizza.jpg", title: "pizza", size: "small", category: "Food" },
    { id: 4, src: "/images/sitting-1.jpeg", title: "The Vibe", size: "small", category: "Interior" },
    { id: 5, src: "/images/sitting-2.jpeg", title: "sitting area ", size: "tall", category: "Interior" },
    { id: 6, src: "/images/spicy wings.webp", title: "wings", size: "wide", category: "Food" },
  ];

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-red-600 font-black uppercase tracking-[0.3em] text-xs">Visual Story</span>
            <h2 className="text-5xl md:text-7xl font-black text-zinc-900 tracking-tighter uppercase italic mt-2">
              CRAFTED <span className="text-stone-300 not-italic">&</span> SERVED
            </h2>
          </div>
          <p className="text-zinc-500 max-w-xs font-medium leading-relaxed">
            A glimpse into our kitchen, our atmosphere, and the dishes that defined us.
          </p>
        </div>

        {/* Masonry-Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-[2rem] group cursor-pointer shadow-xl shadow-zinc-200/50
                ${item.size === 'tall' ? 'row-span-2' : ''}
                ${item.size === 'wide' ? 'col-span-2' : ''}
              `}
            >
              {/* Image */}
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-red-500 font-bold uppercase text-[10px] tracking-widest mb-2">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-black uppercase italic tracking-tighter">
                  {item.title}
                </h3>
              </div>
              
              {/* Subtle Border Glow */}
              <div className="absolute inset-0 border border-white/10 rounded-[2rem] pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Brand Shoutout */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 flex justify-center"
        >
          <div className="flex items-center gap-4 text-zinc-300">
            <div className="h-[1px] w-20 bg-zinc-200" />
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-zinc-400">Follow the flame @yourhandle</span>
            <div className="h-[1px] w-20 bg-zinc-200" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}