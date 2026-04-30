"use client";
import { motion } from 'framer-motion';

export default function MenuHeader() {
  const backgroundVideos = [
    "/images/video1.mp4", "/images/video2.mp4", "/images/video3.mp4",
    "/images/video4.mp4", "/images/video5.mp4", "/images/video6.mp4"
  ];

  return (
    <section className="relative pt-40 pb-24 bg-black border-b border-white/10 overflow-hidden">
      
      {/* 1. Background Video Grid with "Vignette" effect */}
      <div className="absolute inset-0 z-0 grid grid-cols-3 grid-rows-2 gap-1 opacity-60">
        {backgroundVideos.map((src, index) => (
          <div key={index} className="relative w-full h-full overflow-hidden border-[0.5px] border-white/5">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover scale-110" // scale-110 adds a slight "zoom" feel
            >
              <source src={src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>

      {/* 2. Intense Gradient Overlays for "Pop" */}
      {/* Top fade */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-black/20 to-black" />
      {/* Radial glow to focus on the center text */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />
      {/* Subtle Red Heat Glow */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-red-600/20 blur-[120px] rounded-full z-10" />

      {/* 3. Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          
          {/* Badge with glass effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 backdrop-blur-md mb-6"
          >
            <span className="text-red-500 font-bold tracking-[0.4em] uppercase text-[10px]">
              Freshly Prepared Daily
            </span>
          </motion.div>

          {/* Epic Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="text-8xl md:text-[12rem] font-black text-white uppercase tracking-tighter italic leading-[0.8] drop-shadow-2xl">
              OUR <br />
              <span className="text-transparent outline-text drop-shadow-none">MENU</span>
            </h1>
            {/* Secondary Layer for "MENU" to make it glow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-full h-1/2 bg-red-600/10 blur-3xl -z-10" />
          </motion.div>

          {/* Description with better contrast */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 max-w-xl"
          >
            <p className="text-zinc-300 text-lg md:text-2xl font-light leading-relaxed">
              Experience the <span className="text-white font-bold">art of fire</span>. 
              Signature pizzas and gourmet craft burgers, perfected in our kitchens.
            </p>
          </motion.div>

          {/* Animated Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex flex-col items-center gap-4"
          >
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.5em]">
              Explore Categories
            </span>
            <div className="w-[1px] h-20 bg-gradient-to-b from-red-600 to-transparent" />
          </motion.div>

        </div>
      </div>

      {/* Custom CSS for the aggressive outline */}
      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.4);
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.1));
        }
        @media (max-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
          }
        }
      `}</style>
    </section>
  );
}