"use client";
import { useCart } from "./../context/CartContext";
import Link from "next/link";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-white bg-black">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link href="/" className="bg-orange-500 hover:bg-orange-600 transition-colors px-8 py-3 rounded-full font-bold uppercase tracking-wider">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-black mb-8 text-orange-500 italic uppercase tracking-tighter">
          Your <span className="text-white">Selection</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div 
                key={`${item._id}-${item.variant.size}`} 
                className="flex flex-col sm:flex-row items-center gap-6 bg-zinc-900/50 p-5 rounded-3xl border border-zinc-800 shadow-xl transition-all hover:border-zinc-700"
              >
                {/* Image Section */}
                <div className="w-28 h-28 bg-zinc-800 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-700">
                  <img 
                    src={item.image ? `${API_URL}${item.image}` : '/images/placeholder.png'} 
                    alt={item.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Details Section */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-xl capitalize text-white">{item.name}</h3>
                  <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.2em] mt-1">
                    {item.variant.size}
                  </p>
                  <p className="text-orange-500 font-black text-lg mt-2">
                    Rs. {Number(item.variant.price).toFixed(2)}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-5 bg-black/60 rounded-2xl px-5 py-3 border border-zinc-800">
                  <button 
                    onClick={() => updateQuantity(item._id, item.variant.size, -1)} 
                    className="text-zinc-400 hover:text-orange-500 text-xl font-bold transition-colors"
                  > – </button>
                  <span className="w-6 text-center font-black text-base">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.variant.size, 1)} 
                    className="text-zinc-400 hover:text-orange-500 text-xl font-bold transition-colors"
                  > + </button>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item._id, item.variant.size)}
                  className="group p-3 bg-zinc-800/50 hover:bg-red-500/10 rounded-2xl transition-all"
                  aria-label="Remove item"
                >
                  <svg className="w-6 h-6 text-zinc-500 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 sticky top-24 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 blur-[80px] rounded-full"></div>
              
              <h2 className="text-xl font-black mb-8 uppercase italic tracking-tighter flex items-center gap-2">
                Order <span className="text-orange-500">Summary</span>
              </h2>
              
              <div className="space-y-5 mb-8">
                <div className="flex justify-between text-zinc-400 text-sm font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">Rs. {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400 text-sm font-bold uppercase tracking-widest">
                  <span>Delivery</span>
                  <span className="text-green-500">FREE</span>
                </div>
                
                <div className="pt-6 border-t border-zinc-800/50 flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">Payable Amount</span>
                  <span className="text-4xl font-black text-orange-500 italic">
                    Rs. {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link href="/checkout" className="block w-full">
  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_10px_30px_rgba(249,115,22,0.3)] active:scale-[0.98]">
    Checkout Now
  </button>
</Link>
              
              <p className="text-[9px] text-zinc-600 text-center mt-6 uppercase font-bold tracking-tighter">
                Secure payment powered by Pizza Bites
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;