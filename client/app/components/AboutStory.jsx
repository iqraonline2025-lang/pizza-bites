"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutStory() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- PART 1: HOW IT STARTED --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-red-600 font-black uppercase tracking-[0.3em] text-sm mb-6">
              Our Roots
            </h2>
            <h3 className="text-5xl md:text-7xl font-black text-zinc-900 leading-tight mb-8 italic">
              IT ALL BEGAN WITH A <span className="text-zinc-400">SINGLE FLAME.</span>
            </h3>
            <div className="space-y-6 text-zinc-600 text-lg md:text-xl leading-relaxed">
              <p>
                In 2018, we started in a small garage with nothing but a custom-built 
                wood-fired oven and a family recipe for dough that had been passed 
                down for three generations.
              </p>
              <p>
                What began as a weekend passion project for neighbors quickly turned 
                into a local obsession. We realized that people weren't just hungry 
                for food—they were hungry for <span className="text-zinc-900 font-bold underline decoration-red-500">authenticity</span>.
              </p>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] w-full order-1 lg:order-2"
          >
            <div className="absolute inset-0 bg-stone-200 rounded-[3rem] overflow-hidden rotate-2 group">
               {/* Replace with an image of your original oven or chef */}
               <Image 
                src="/images/aboutpage.webp" 
                alt="Our first oven" 
                fill 
                className="object-cover -rotate-2 group-hover:scale-110 transition-transform duration-700"
               />
            </div>
            {/* Decorative Label */}
            <div className="absolute -bottom-6 -left-6 bg-red-600 text-white p-8 rounded-2xl shadow-xl hidden md:block">
              <p className="text-4xl font-black italic">7+</p>
              <p className="text-xs uppercase tracking-widest font-bold">Years of Passion</p>
            </div>
          </motion.div>
        </div>

        {/* --- PART 2: THE MISSION --- */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[4rem] bg-zinc-900 p-12 md:p-24 overflow-hidden text-center"
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ef4444_0%,_transparent_70%)]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <span className="text-red-500 font-bold uppercase tracking-[0.5em] text-xs">The Mission</span>
            <h4 className="mt-6 text-4xl md:text-6xl font-bold text-white leading-tight">
              To redefine fast food through the <span className="italic text-zinc-400">art of fire</span> and local craft.
            </h4>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Quality", desc: "No frozen ingredients. Ever." },
                { title: "Community", desc: "Sourcing 90% from local farms." },
                { title: "Craft", desc: "Hand-stretched dough, every time." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 border border-white/10 rounded-3xl hover:bg-white/5 transition-colors">
                  <p className="text-red-500 font-black uppercase text-xs mb-2">{item.title}</p>
                  <p className="text-zinc-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}