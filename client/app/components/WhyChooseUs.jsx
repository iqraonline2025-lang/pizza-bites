"use client";
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      title: "Fresh Ingredients",
      desc: "We source 100% organic, local produce and premium meats daily. No preservatives, no compromises.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
        </svg>
      ),
      color: "from-green-500 to-emerald-600",
    },
    {
      id: 2,
      title: "Fast Delivery",
      desc: "Our optimized logistics ensure your meal arrives piping hot within 30 minutes. The flame never dies.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 6.75a3.5 3.5 0 01-4.47 4.47L2.25 20.25l1.125 1.125L14.73 10.02a3.5 3.5 0 11.86-3.27z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 3l2.25 2.25L18 3l2.25 2.25L22.5 3" />
        </svg>
      ),
      color: "from-red-500 to-orange-600",
    },
    {
      id: 3,
      title: "Best Taste",
      desc: "Our secret? A decade-old sourdough starter and custom-blended spices that you won't find anywhere else.",
      icon: (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      ),
      color: "from-yellow-400 to-orange-500",
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Background Text */}
      <div className="absolute top-10 left-10 text-[10rem] font-black text-zinc-50 select-none -z-0 leading-none">
        QUALITY
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-600 font-black uppercase tracking-[0.4em] text-xs"
          >
            Why Choose Us
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-[1000] text-zinc-900 mt-4 tracking-tighter uppercase italic"
          >
            The <span className="text-transparent outline-text-dark">Standard</span> of Excellence
          </motion.h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="group relative p-10 rounded-[3rem] bg-stone-50 border border-zinc-100 hover:bg-white hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-500"
            >
              {/* Icon Circle */}
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-6 transition-transform duration-500`}>
                {feature.icon}
              </div>

              <h3 className="text-2xl font-black text-zinc-900 uppercase italic mb-4">
                {feature.title}
              </h3>
              
              <p className="text-zinc-500 leading-relaxed font-medium">
                {feature.desc}
              </p>

              {/* Decorative Number */}
              <span className="absolute top-8 right-10 text-6xl font-black text-zinc-100 group-hover:text-red-50 transition-colors">
                0{idx + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .outline-text-dark {
          -webkit-text-stroke: 2px #18181b;
          color: transparent;
        }
        @media (max-width: 768px) {
          .outline-text-dark {
            -webkit-text-stroke: 1px #18181b;
          }
        }
      `}</style>
    </section>
  );
}