"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const faqs = [
  {
    question: "Do you offer vegan or gluten-free options?",
    answer: "Absolutely. We offer gluten-free crusts for all our pizzas and have a dedicated range of plant-based toppings and vegan cheeses. Just let our staff know about your requirements."
  },
  {
    question: "How do you source your ingredients?",
    answer: "We partner with local farmers within a 50-mile radius to ensure our produce is picked at peak ripeness. Our flour is imported from Italy, and our meats are strictly hormone-free."
  },
  {
    question: "Can I book the restaurant for private events?",
    answer: "Yes! We love hosting celebrations. Whether it's a birthday or a corporate event, we can accommodate up to 50 guests. Contact us via our booking form for tailored menu options."
  },
  {
    question: "What makes your fire-baked technique special?",
    answer: "Our custom stone ovens reach temperatures of 800°F. This flash-sears the dough, creating a perfect 'leopard-spotted' char while keeping the inside light and airy."
  }
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-red-600 font-black uppercase tracking-[0.4em] text-xs"
          >
            Got Questions?
          </motion.span>
          <h2 className="text-5xl md:text-6xl font-[1000] text-zinc-900 mt-4 tracking-tighter uppercase italic">
            FAQ<span className="text-transparent outline-text-dark">S</span>
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-zinc-200"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${activeIndex === index ? 'text-red-600' : 'text-zinc-800 group-hover:text-red-500'}`}>
                  {faq.question}
                </span>
                <span className={`text-3xl font-light transition-transform duration-500 ${activeIndex === index ? 'rotate-45 text-red-600' : 'text-zinc-400'}`}>
                  +
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-zinc-600 text-lg leading-relaxed max-w-2xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Support Call-to-Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-10 bg-white rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/50 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-zinc-900 uppercase italic">Still have questions?</h3>
            <p className="text-zinc-500 mt-1">We're here to help you with anything you need.</p>
          </div>
         <Link href="/contact">
  <button className="px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-widest rounded-full hover:bg-zinc-900 transition-all duration-300 transform hover:scale-105 active:scale-95">
    Contact Support
  </button>
</Link>
        </motion.div>

      </div>

      <style jsx>{`
        .outline-text-dark {
          -webkit-text-stroke: 1.5px #18181b;
          color: transparent;
        }
      `}</style>
    </section>
  );
}