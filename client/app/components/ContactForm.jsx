"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleWhatsApp = (e) => {
    e.preventDefault();
    
    // 1. REPLACE THIS WITH YOUR ACTUAL NUMBER
    // Format: CountryCode + Number (No +, No spaces, No zeros at start)
    // Example for Pakistan: 923001234567
    const phoneNumber = "+923370666000"; 
    
    // 2. Format the message properly for a URL
    const messageBody = `* Inquiry*\n\n` +
                        `*Name:* ${formData.name}\n` +
                        `*Email:* ${formData.email}\n` +
                        `*Message:* ${formData.message}`;

    // 3. Use encodeURIComponent to prevent the "Not Found" error
    const encodedMessage = encodeURIComponent(messageBody);

    // 4. Use the full API URL for better compatibility
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    
    // 5. Open in a new tab safely
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-3xl p-10 md:p-16 rounded-[4rem] border border-white/20 shadow-2xl"
        >
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
              SEND US A <span className="text-red-500">MESSAGE.</span>
            </h2>
            <p className="text-stone-400 mt-2 font-medium">Clicking send will open WhatsApp directly.</p>
          </div>

          <form onSubmit={handleWhatsApp} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 ml-2">Name</label>
                <input 
                  required
                  type="text" 
                  placeholder="Your Name"
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 ml-2">Email</label>
                <input 
                  required
                  type="email" 
                  placeholder="Email Address"
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:ring-2 focus:ring-red-600 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 ml-2">Message</label>
              <textarea 
                required
                rows="4" 
                placeholder="How can we help?"
                className="bg-white/5 border border-white/10 rounded-2xl p-5 text-white focus:ring-2 focus:ring-red-600 outline-none resize-none transition-all"
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-6 bg-red-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white hover:text-red-600 transition-all duration-500 shadow-xl shadow-red-600/20 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
