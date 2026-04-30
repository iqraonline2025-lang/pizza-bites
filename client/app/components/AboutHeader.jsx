"use client";
import { motion } from 'framer-motion';

export default function AboutHeader() {
  return (
    <section className="relative pt-44 pb-32 bg-stone-50 overflow-hidden">
      
      {/* 1. Background Visual - Subtle & High Class */}
      <div className="absolute top-0 right-0 w-2/3 h-full z-0 opacity-80">
        <div className="relative w-full h-full">
          {/* Replace src with a cinematic chef or ingredient shot */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/images/about.mp4" type="video/mp4" />
          </video>
          {/* Soft White Fade to blend the video into the background */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-stone-50/40 to-transparent" />
        </div>
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          
          <div className="flex flex-col items-start">
            {/* Minimalist Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-[2px] bg-red-600" />
              <span className="text-red-600 font-black uppercase tracking-[0.4em] text-xs">
                Since 2012
              </span>
            </motion.div>

            {/* Massive Staggered Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-8xl md:text-[11rem] font-black text-zinc-900 leading-[0.8] tracking-tighter uppercase italic"
            >
              ABOUT <br />
              <span className="text-transparent outline-text pl-4">US.</span>
            </motion.h1>
          </div>

          {/* Floating Context Box */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:mb-4 max-w-md p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.05)]"
          >
            <p className="text-zinc-700 text-lg md:text-xl font-medium leading-relaxed">
              We believe great food is a <span className="text-red-600">universal language</span>. 
              Our journey started with a single wood-fired oven and a simple mission: 
              to bring fire-kissed flavors to your table.
            </p>
            
            {/* Mini Scroll Link */}
            <div className="mt-8 flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300">
                <span className="text-zinc-900 group-hover:text-white transition-colors">↓</span>
              </div>
              <span className="text-zinc-400 group-hover:text-zinc-900 font-bold uppercase text-[10px] tracking-widest transition-colors">
                Discover our story
              </span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Background Decorative Accent */}
      <div className="absolute left-[-5%] bottom-[-10%] text-[25rem] font-black text-zinc-200/40 select-none -z-10 leading-none italic">
        STORY
      </div>

      <style jsx>{`
        .outline-text {
          -webkit-text-stroke: 2.5px #18181b; /* zinc-900 */
          color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 1px #18181b;
          }
        }
      `}</style>
    </section>
  );
}