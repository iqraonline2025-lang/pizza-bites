"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  const videos = ['/images/burger.mp4', '/images/stakes.mp4', '/images/pizza.mp4'];

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-black font-sans">
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 h-full w-full">
        {videos.map((src, index) => (
          <div key={index} className="relative h-full w-full overflow-hidden border-x border-white/5">
            <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-40">
              <source src={src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center px-4">
        {/* We use animate instead of whileInView to force visibility on back-nav */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none uppercase">
            DELICIOUS PIZZA <br />
            <span className="text-red-600 block mt-2">DELIVERED FAST</span>
          </h1>

          <p className="mt-8 text-gray-300 text-lg md:text-xl font-bold uppercase tracking-[0.2em]">
            Dine-in • Takeaway • Delivery
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <Link href="/menu" className="px-12 py-5 bg-white text-black font-black uppercase rounded-full hover:bg-yellow-500 transition-all text-xl shadow-2xl">
              View Menu
            </Link>
           
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-10 pointer-events-none" />
    </section>
  );
}
