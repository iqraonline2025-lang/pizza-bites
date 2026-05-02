"use client";
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "James Wilson",
    role: "Local Guide",
    text: "The Bar B Q Pizza is easily the best in the city. Crust is crispy, toppings are fresh, and delivery was under 20 minutes!",
    stars: 5,
    tag: "Pizza Lover"
  },
  {
    name: "Sarah Jenkins",
    role: "Food Blogger",
    text: "Tried the Afghani Wrap meal today. The flavors are so authentic! Definitely my new go-to lunch spot.",
    stars: 5,
    tag: "Wrap Enthusiast"
  },
  {
    name: "Mike Thompson",
    role: "Verified Customer",
    text: "Free delivery over 200 RS actually works. Everything arrived piping hot. Those wings are addictive!",
    stars: 5,
    tag: "Wing Master"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
              REAL STORIES, <span className="text-red-600">REAL FLAVOR</span>
            </h2>
            <div className="flex justify-center gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              ))}
              <span className="ml-3 text-white font-bold tracking-widest uppercase text-sm self-center">
                4.9/5 RATING
              </span>
            </div>
          </motion.div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-colors group"
            >
              <Quote className="absolute top-6 right-8 w-12 h-12 text-white/5 group-hover:text-red-600/20 transition-colors" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8 italic font-medium">
                "{rev.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-yellow-500 flex items-center justify-center text-white font-black">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-tight leading-none">
                    {rev.name}
                  </h4>
                  <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    {rev.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
