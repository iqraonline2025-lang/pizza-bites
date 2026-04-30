"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
// Standard icons usually work fine; it's just the social names that clash
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Hardcoded Social SVGs */}
          <div className="space-y-6">
            <Link href="/" className="text-3xl font-black tracking-tighter uppercase italic">
              PIZZA<span className="text-red-600 not-italic">BITES</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
              Slinging the best dough in town since 2010. Authentic fire-baked crusts and locally sourced toppings.
            </p>
            <div className="flex gap-4">
              {/* Instagram SVG */}
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 transition-all border border-white/5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              {/* Facebook SVG */}
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 transition-all border border-white/5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* Twitter/X SVG */}
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 transition-all border border-white/5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li><Link href="/menu" className="hover:text-red-500 transition-colors">Full Menu</Link></li>
              <li><Link href="/about" className="hover:text-red-500 transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-red-500 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4 text-zinc-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-red-600 shrink-0" />
                <span>Pizza Bites Fawara Chowk Dinga, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-red-600 shrink-0" />
                <span>+923070999000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-red-600 shrink-0" />
                <span>pizzabitesdinga@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
            <h4 className="text-lg font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock size={18} className="text-yellow-500" /> Hours
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li className="flex justify-between">
                <span className="text-zinc-500 uppercase text-[10px] tracking-widest">Mon - Thu</span>
                <span>3pm -12am</span>
              </li>
              <li className="flex justify-between border-y border-white/5 py-2">
                <span className="text-zinc-500 uppercase text-[10px] tracking-widest">Fri - Sat</span>
                <span className="text-red-500">3pm -12am</span>
              </li>
              <li className="flex justify-between">
                <span className="text-zinc-500 uppercase text-[10px] tracking-widest">Sunday</span>
                <span>3pm - 12am</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-[10px] font-bold tracking-[0.2em] uppercase">
          <p>&copy; {currentYear} PIZZA BITES.</p>
        </div>
      </div>
    </footer>
  );
}