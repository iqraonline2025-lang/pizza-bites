"use client";
import { motion } from 'framer-motion';

export default function MapSection() {
  // Your specific location embed URL
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.614838634839!2d73.7188!3d32.3948!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDIzJzQxLjMiTiA3M8KwNDMnMDcuNyJF!5e0!3m2!1sen!2spk!4v1714400000000!5m2!1sen!2spk";

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-red-600 font-black uppercase tracking-[0.4em] text-xs"
            >
              Visit Us
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-[1000] text-zinc-900 mt-4 tracking-tighter uppercase italic">
              IN THE HEART <br />
              <span className="text-transparent outline-text-dark">OF DINGA.</span>
            </h2>
          </div>
          
          <div className="bg-stone-50 p-8 rounded-[2rem] border border-zinc-100">
            <p className="text-zinc-500 font-medium text-lg leading-relaxed">
              Located at <span className="text-zinc-900 font-bold">Fawara Chowk</span>, we are the go-to spot for the best pizza in the city. Follow the smell of fresh dough!
            </p>
          </div>
        </div>

        {/* Map Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[500px] md:h-[600px] rounded-[3.5rem] overflow-hidden shadow-2xl shadow-zinc-200 border-4 border-white group"
        >
          {/* Google Maps Iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3374.321684346747!2d73.71869817623588!3d32.394982603310065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f6920f26938cb%3A0xe72688796856037a!2sPizza%20Bite%20Dinga!5e0!3m2!1sen!2s!4v1714400000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-[1.01]"
          ></iframe>

          {/* Floating Address Overlay */}
          <div className="absolute bottom-8 left-8 right-8 md:right-auto md:w-96 p-8 bg-zinc-900/90 backdrop-blur-xl rounded-[2.5rem] text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Pizza Bite</h3>
            </div>
            
            <p className="text-zinc-400 font-medium mb-6">
              Fawara Chowk, Dinga,<br />
              District Gujrat, Pakistan.
            </p>

            <a 
              href="https://www.google.com/maps/dir//Pizza+Bite+Dinga/@32.3949826,73.7186982,17z/" 
              target="_blank" 
              className="inline-block w-full text-center py-4 bg-white text-zinc-900 font-black uppercase tracking-widest rounded-2xl hover:bg-red-600 hover:text-white transition-all duration-300"
            >
              Get Directions
            </a>
          </div>
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