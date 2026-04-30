"use client";
import { motion } from 'framer-motion';

export default function OpeningHours() {
  const days = [
    { day: "Monday", time: "03:00 PM - 12:00 AM", status: "Open" },
    { day: "Tuesday", time: "03:00 PM - 12:00 AM", status: "Open" },
    { day: "Wednesday", time: "03:00 PM - 12:00 AM", status: "Open" },
    { day: "Thursday", time: "03:00 PM - 12:00 AM", status: "Open" },
    { day: "Friday", time: "03:00 PM - 12:00 AM", status: "Open", highlight: true },
    { day: "Saturday", time: "03:00 PM - 12:00 AM", status: "Open", highlight: true },
    { day: "Sunday", time: "03:00 PM - 12:00 AM", status: "Open" },
  ];

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-500 font-black uppercase tracking-[0.4em] text-xs"
          >
            Availability
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-[1000] text-white mt-4 tracking-tighter uppercase italic">
            OPENING <span className="text-transparent outline-text-white">HOURS</span>
          </h2>
          <p className="text-zinc-500 mt-6 font-medium max-w-sm mx-auto leading-relaxed">
            From early morning cravings to late-night feasts, we are here for you.
          </p>
        </div>

        {/* Schedule Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl"
        >
          <div className="space-y-6">
            {days.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-white/5 last:border-0 transition-all duration-300 group
                  ${item.highlight ? 'text-red-500' : 'text-zinc-300'}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-black uppercase tracking-widest text-zinc-600">0{idx + 1}</span>
                  <h3 className="text-xl md:text-2xl font-bold group-hover:translate-x-2 transition-transform italic uppercase tracking-tight">
                    {item.day}
                  </h3>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-8 mt-2 md:mt-0">
                  <span className="font-mono text-lg md:text-xl font-medium tracking-tighter">
                    {item.time}
                  </span>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest 
                    ${item.highlight ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-white/10 text-white'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Legend / Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-red-600/10 border border-red-600/20 rounded-2xl">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-500 font-bold uppercase text-[10px] tracking-widest">
              Live: Serving Hot Pizza Now
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .outline-text-white {
          -webkit-text-stroke: 1.5px white;
          color: transparent;
        }
      `}</style>
    </section>
  );
}