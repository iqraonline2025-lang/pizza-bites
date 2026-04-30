"use client"; // Required because we are using the useCart hook
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useCart } from "../context/CartContext"; // 1. Import the hook

export default function Navbar() {
  // 2. Access the cart state
  const { cart } = useCart();

  // 3. Calculate total items (sum of all quantities)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
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

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Home</Link>
            <Link href="/menu" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Menu</Link>
            <Link href="/about" className="text-gray-700 hover:text-red-600 font-medium transition-colors">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-600 font-medium transition-colors">Contact</Link>
          </div>

          {/* Cart and CTA */}
          <div className="flex items-center space-x-5">
            {/* 4. Link the cart button to the cart page */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-red-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {/* 5. Dynamically display the item count */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-white bg-red-600 rounded-full border-2 border-white animate-in zoom-in duration-300">
                  {totalItems}
                </span>
              )}
            </Link>
            
            <Link href="/menu" className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 hover:shadow-md transition duration-300">
              Order Now
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}