"use client";
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AboutPreview() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Images with Overlap Effect */}
          <div className="relative h-[500px] md:h-[600px]">
            {/* Background Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 w-4/5 h-4/5 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image 
                src="/images/bar b q pizza.jpg" 
                alt="Our Chef" 
                fill 
                className="object-cover"
              />
            </motion.div>

            {/* Foreground Floating Image */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-2xl overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image 
                src="/images/fish bite wrap.webp" 
                alt="Fresh Ingredients" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-sm">
              Our Story
            </span>
            
            <h2 className="text-5xl md:text-6xl font-black text-black leading-tight uppercase tracking-tighter">
              Crafting <span className="italic font-serif text-gray-500">Memories</span> <br /> 
              One Slice at a Time
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Founded in the heart of the city, **Pizza Bites** started with a simple mission: 
              to bring authentic, fire-baked pizza to your table without the long wait. 
              We use 24-hour fermented dough and locally sourced ingredients to ensure 
              every bite is a masterpiece.
            </p>

            <div className="pt-4">
              <Link href="/about" className="group inline-flex items-center space-x-3">
                <span className="px-8 py-4 bg-black text-white font-bold uppercase rounded-full group-hover:bg-red-600 transition-colors duration-300">
                  Read Our Story
                </span>
                <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                  <span className="text-xl">→</span>
                </div>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}