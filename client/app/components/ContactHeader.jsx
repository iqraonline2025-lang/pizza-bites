"use client";
import { motion } from 'framer-motion';

export default function ContactHeader() {
  return (
    <section className="relative pt-44 pb-20 bg-stone-50 overflow-hidden">
      
      {/* 1. Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-10 pointer-events-none">
        <h2 className="text-[20rem] font-black tracking-tighter rotate-12 translate-x-20 select-none">
          HELLO
        </h2>
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Massive Typography */}
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-[2px] bg-red-600" />
              <span className="text-red-600 font-black uppercase tracking-[0.4em] text-xs">
                Get in touch
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-8xl md:text-[11rem] font-black text-zinc-900 leading-[0.8] tracking-tighter uppercase italic"
            >
              SAY <br />
              <span className="text-transparent outline-text-dark">HELLO.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="mt-10 text-zinc-500 text-xl md:text-2xl font-medium max-w-md leading-relaxed"
            >
              Have a question about our menu, events, or just want to share some love? <br />
              <span className="text-zinc-900">We're all ears.</span>
            </motion.p>
          </div>

          {/* Right Side: Visual Element */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative group"
          >
            <div className="relative h-[450px] w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-zinc-200">
               <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
              >
                <source src="/images/contact.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute bottom-6 left-6 right-6 p-8 bg-white/60 backdrop-blur-xl rounded-[2rem] border border-white/40">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Call us</p>
                      <p className="text-zinc-900 font-bold">053-7403000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-600/10 blur-3xl -z-10 rounded-full" />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .outline-text-dark {
          -webkit-text-stroke: 2.5px #18181b;
          color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text-dark {
            -webkit-text-stroke: 1.5px #18181b;
          }
        }
      `}</style>
    </section>
  );
}