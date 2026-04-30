"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const MenuGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_URL]);

  if (loading) return <div className="text-zinc-500 animate-pulse">Loading Menu...</div>;

  const categories = ['pizza', 'burgers', 'wraps', 'drinks', 'family fiesta', 'pizza deals'];

  return (
    <div className="space-y-16">
      {categories.map((cat) => {
        const filtered = products.filter((p) => p.category === cat);
        if (filtered.length === 0) return null;

        return (
          <section key={cat} id={cat.replace(/\s+/g, '-')} className="scroll-mt-32">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                {cat} <span className="text-orange-500">.</span>
              </h2>
              <div className="h-px flex-1 bg-zinc-800"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default MenuGrid;