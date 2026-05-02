"use client";
import { motion } from 'framer-motion';
import { Smartphone, Gift } from 'lucide-react';
import Link from 'next/link'; // Added this

export default function FinalCTA() {
  return (
    <section className="relative py-20 overflow-hidden bg-black">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-600 skew-x-12 translate-x-20 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
              Hungry yet? <br />
              <span className="text-red-500 italic font-serif lowercase text-4xl md:text-6xl">join the</span> <br />
              PIZZA BITES CLUB
            </h2>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Gift className="text-red-500 w-5 h-5" />
                </div>
                <span className="text-white font-bold uppercase tracking-widest text-sm">Birthday Rewards</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Smartphone className="text-red-500 w-5 h-5" />
                </div>
                <span className="text-white font-bold uppercase tracking-widest text-sm">Exclusive App Deals</span>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              {/* Order Now Redirect Fix */}
              <Link href="/menu">
                <button className="px-10 py-5 bg-red-600 text-white font-black uppercase rounded-full hover:bg-white hover:text-black transition-all shadow-xl w-full sm:w-auto">
                  Order Now
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
              <img 
                src="/images/bar b q pizza.jpg" 
                alt="Reward Pizza"
                className="w-full h-full object-cover rounded-full border-[15px] border-white/10 shadow-[0_0_50px_rgba(239,68,68,0.3)]"
              />
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-5 -left-5 bg-yellow-500 text-black p-6 rounded-full font-black text-xl shadow-2xl"
              >
                FREE!
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
