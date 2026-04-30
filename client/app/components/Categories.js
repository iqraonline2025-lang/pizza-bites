"use client";
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Pizza', icon: '🍕', slug: 'pizza', image: '/images/bar b q pizza.jpg' },
  { name: 'Burgers', icon: '🍔', slug: 'burgers', image: '/images/chicken burger meal.jpg' },
  { name: 'Wraps', icon: '🌯', slug: 'wraps', image: '/images/afghani wrap meal.avif' },
  { name: 'Wings', icon: '🍗', slug: 'wings', image: '/images/nuggets.webp' },
  { name: 'Drinks', icon: '🥤', slug: 'drinks', image: '/images/ice cream shake bite special.jpg' },
];

export default function Categories() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Minimalist Header */}
        <div className="flex justify-between items-end mb-16 border-b border-white/10 pb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-red-600 font-bold tracking-[0.4em] uppercase text-xs mb-2 block">
              Menu Highlights
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
              The <span className="italic font-serif text-gray-400">Lineup</span>
            </h2>
          </motion.div>
          
          <Link href="/menu" className="text-white border-b border-white pb-1 hover:text-red-500 hover:border-red-500 transition-all uppercase text-sm font-bold tracking-widest hidden md:block">
            View Full Menu
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.slug}
              // FIX: Changed whileInView to animate for persistence on back-navigation
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="relative group h-[500px] overflow-hidden cursor-pointer bg-zinc-900"
            >
              <Link href={`/menu?category=${cat.slug}`}>
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  priority={index < 5} // Pre-loads these images so they never disappear
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0"
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                  {/* Top: Icon */}
                  <div className="flex justify-end">
                    <span className="text-4xl opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                      {cat.icon}
                    </span>
                  </div>

                  {/* Bottom: Big Text */}
                  <div className="relative">
                    <h3 className="text-5xl font-black text-white uppercase leading-none mb-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                      {cat.name}
                    </h3>
                    <div className="h-1 w-0 bg-red-600 transition-all duration-500 group-hover:w-full mb-3" />
                    <p className="text-white font-bold uppercase tracking-widest text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      Explore Selection &rarr;
                    </p>
                  </div>
                </div>

                {/* Cinematic Border Frame */}
                <div className="absolute inset-0 border-[0px] group-hover:border-[10px] border-white/5 transition-all duration-500 pointer-events-none z-30" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}