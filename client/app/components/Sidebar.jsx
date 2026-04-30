"use client";
import { useState, useEffect } from 'react';

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchCats = async () => {
      try {
        if (!API_URL) return;
        const res = await fetch(`${API_URL}/api/products/sidebar-categories`);
        if (!res.ok) throw new Error("Server response error");
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Sidebar connection failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, [API_URL]);

  const getIcon = (name) => {
    const icons = {
      'pizza': '🍕',
      'burgers': '🍔',
      'wraps': '🌯',
      'pasta': '🍝',
      'sandwich': '🥪',
      'wings': '🍗',
      'drinks': '🥤',
      'family fiesta': '👨‍👩‍👧‍👦',
      'pizza deals': '🏷️'
    };
    return icons[name.toLowerCase()] || '🍴';
  };

  return (
    <div className="w-full bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-3xl p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-8 px-2">
        <h2 className="text-white font-bold text-lg tracking-tight">
          Explore <span className="text-orange-500">Menu</span>
        </h2>
        <div className="h-1 w-12 bg-orange-500 rounded-full"></div>
      </div>

      <nav className="flex flex-col gap-3">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="w-full h-12 bg-zinc-800/40 animate-pulse rounded-2xl"></div>
          ))
        ) : categories.length > 0 ? (
          categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`group w-full flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 border ${
                activeCategory === cat 
                ? "bg-orange-500 text-white border-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)]" 
                : "text-zinc-400 border-transparent hover:bg-zinc-800/50 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-xl transition-transform ${activeCategory === cat ? 'scale-125' : 'group-hover:scale-125'}`}>
                  {getIcon(cat)}
                </span>
                <span className="capitalize font-semibold tracking-wide text-sm">
                  {cat}
                </span>
              </div>
              <svg className={`w-4 h-4 transition-all ${activeCategory === cat ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" />
              </svg>
            </button>
          ))
        ) : (
          <div className="text-center py-10 border border-dashed border-zinc-800 rounded-2xl">
             <p className="text-zinc-500 text-sm">No categories found.</p>
          </div>
        )}
      </nav>

      <div className="mt-8 pt-6 border-t border-zinc-800/50 px-2">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-tighter text-zinc-500 font-bold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Kitchen Live
        </div>
      </div>
    </div>
  );
};

export default Sidebar;