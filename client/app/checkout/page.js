"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";

const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useCart(); // Added clearCart
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();

    // ✅ FIX 1: Clean Phone Number (NO +, NO spaces, NO dashes)
    const phoneNumber = "923370666000"; 

    // Build the order list text
    const orderItems = cart
      .map(
        (item) =>
          `• *${item.name}* (${item.variant.size})\n  Qty: ${item.quantity} | Rs. ${(
            item.variant.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n\n");

    // Build the full message template
    const message = `*🔥 NEW ORDER - PIZZA BITES 🔥*
--------------------------
*CUSTOMER DETAILS:*
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📍 Address: ${formData.address}

*ORDER SUMMARY:*
${orderItems}

--------------------------
*TOTAL PAYABLE: Rs. ${totalPrice.toFixed(2)}*
--------------------------
_Please confirm my order!_`;

    // ✅ FIX 2: Proper encoding to avoid 404/broken links
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, "_blank");

    // Optional: Clear the cart after sending
    // if (clearCart) clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-4">No items to checkout</h2>
        <Link href="/" className="bg-orange-500 px-6 py-2 rounded-full font-bold">Go to Menu</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-xl">
        <Link href="/cart" className="text-zinc-500 hover:text-orange-500 transition-colors flex items-center gap-2 mb-8 uppercase text-[10px] font-black tracking-widest">
          ← Edit Selection
        </Link>

        <div className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 blur-[80px] rounded-full"></div>

          <h1 className="text-3xl font-black mb-2 uppercase italic tracking-tighter relative">
            Delivery <span className="text-orange-500">Details</span>
          </h1>
          <p className="text-zinc-500 text-sm mb-10 font-medium relative">
            Complete the form to finalize your order on WhatsApp.
          </p>

          <form onSubmit={handleWhatsAppOrder} className="space-y-6 relative">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400 ml-2">Full Name</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-black border border-zinc-800 p-5 rounded-2xl focus:border-orange-500 outline-none transition-all text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400 ml-2">Phone Number</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your contact number"
                className="w-full bg-black border border-zinc-800 p-5 rounded-2xl focus:border-orange-500 outline-none transition-all text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-black tracking-[0.2em] text-zinc-400 ml-2">Delivery Address</label>
              <textarea
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House #, Street, Area..."
                rows="3"
                className="w-full bg-black border border-zinc-800 p-5 rounded-2xl focus:border-orange-500 outline-none transition-all text-white resize-none"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_10px_40px_rgba(249,115,22,0.3)] active:scale-95 flex items-center justify-center gap-3"
              >
                Send Order to WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;