"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [showModal, setShowModal] = useState(false);
  
  // Clean up API URL to prevent double slashes
  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const API_URL = rawApiUrl.endsWith("/") ? rawApiUrl.slice(0, -1) : rawApiUrl;

  // --- IMAGE HELPER ---
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://placehold.co/600x400/27272a/white?text=No+Image";
    
    // If it's a Cloudinary link (starts with http), return it directly
    if (imagePath.startsWith('http')) return imagePath;
    
    // Otherwise, it's an old local path, so prefix with backend URL
    const formattedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${API_URL}${formattedPath}`;
  };

  const handleAddToCart = (e) => {
    if (e) e.stopPropagation();
    addToCart(product, selectedVariant);
    setShowModal(false);
  };

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-all group flex flex-col h-full cursor-pointer shadow-lg"
      >
        {/* Image */}
        <div className="relative h-44 w-full bg-zinc-800 overflow-hidden">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400/27272a/white?text=Pizza+Bites";
            }}
          />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <div className="mb-2">
            <h3 className="text-lg font-bold text-white capitalize">{product.name}</h3>
            <p className="text-zinc-500 text-[11px] mt-1 line-clamp-2 leading-tight">
              {product.description || "No description available."}
            </p>
          </div>

          {/* Quick Choice Buttons */}
          <div className="flex flex-wrap gap-2 my-3">
            {product.variants.map((v, i) => (
              <button
                key={i}
                onClick={(e) => {
                    e.stopPropagation(); 
                    setSelectedVariant(v);
                }}
                className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all border ${
                  selectedVariant.size === v.size 
                    ? "bg-orange-500 border-orange-500 text-white" 
                    : "bg-transparent border-zinc-700 text-zinc-500 hover:border-zinc-500"
                }`}
              >
                {v.size}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
            <div>
              <p className="text-orange-500 text-xl font-black italic">
                Rs. {Number(selectedVariant?.price).toFixed(2)}
              </p>
            </div>
            <div 
              onClick={handleAddToCart}
              className="bg-orange-500 group-hover:bg-white group-hover:text-orange-500 text-white w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-colors cursor-pointer"
            >
                <span className="text-xl font-bold">+</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl overflow-hidden relative shadow-2xl">
            <button 
              onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
              className="absolute top-4 right-4 bg-zinc-800/80 text-white w-10 h-10 rounded-full hover:bg-orange-500 transition-colors z-10"
            >✕</button>

            <img 
              src={getImageUrl(product.image)} 
              className="w-full h-64 object-cover" 
              alt={product.name} 
            />
            
            <div className="p-8">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{product.name}</h2>
              <p className="text-zinc-400 text-sm mt-2 mb-6 leading-relaxed">{product.description}</p>

              <div className="mb-8">
                <p className="text-[10px] font-bold text-zinc-500 uppercase mb-3 tracking-widest">Select Option</p>
                <div className="flex gap-3">
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      className={`flex-1 py-4 rounded-2xl text-xs font-bold uppercase transition-all border-2 ${
                        selectedVariant.size === v.size 
                          ? "border-orange-500 bg-orange-500/10 text-white" 
                          : "border-zinc-800 bg-zinc-800/50 text-zinc-500 hover:border-zinc-700"
                      }`}
                    > {v.size} </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
                <div className="flex flex-col">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Total Price</span>
                    <span className="text-3xl font-black text-orange-500 italic">Rs. {Number(selectedVariant?.price).toFixed(2)}</span>
                </div>
                <button 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-500/40 uppercase text-xs"
                  onClick={handleAddToCart}
                > Add to Cart </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;