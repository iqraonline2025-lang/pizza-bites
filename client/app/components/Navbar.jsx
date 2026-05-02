"use client";
import { useState } from 'react'; // Added for toggle functionality
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react'; // Added Menu and X icons
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section - Always Visible */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-red-600">
                <Image 
                  src="/images/logo.png" 
                  alt="Pizza bites"
                  fill 
                  sizes="40px"
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-2xl font-black text-red-600 tracking-tighter">
                PIZZA<span className="text-yellow-500">Bites</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Home</Link>
            <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Menu</Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Contact</Link>
          </div>

          {/* Desktop Right Side (Cart & Order) - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-5">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-red-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-600 rounded-full border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link href="/menu" className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition duration-300">
              Order Now
            </Link>
          </div>

          {/* Mobile Hamburger Button - Only visible on small screens */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2 shadow-lg">
          <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium">Home</Link>
          <Link href="/menu" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium">Menu</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium">About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md font-medium">Contact</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-red-600 font-bold border-t border-gray-100 pt-4">My Cart ({totalItems})</Link>
        </div>
      )}
    </nav>
  );
}
