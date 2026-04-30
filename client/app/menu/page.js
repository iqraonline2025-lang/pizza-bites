'use client';
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import MenuHeader from "../components/MenuHeader";

export default function Menu() {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("pizza"); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
                const data = await res.json();
                
                // FIX: Ensure we are setting an array even if the API 
                // wraps the data in an object (e.g., { products: [] })
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data && typeof data === 'object' && Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    setProducts([]); 
                }
            } catch (err) { 
                console.error("Fetch error:", err); 
                setProducts([]); // Fallback to empty array on error
            }
            finally { setLoading(false); }
        };
        fetchProducts();
    }, []);

    // FIX: Added Array.isArray check to prevent "filter is not a function" error
    const filteredProducts = Array.isArray(products) 
        ? products.filter(p => p.category?.toLowerCase() === activeCategory?.toLowerCase())
        : [];

    return (
        <div className="flex flex-col min-h-screen bg-black text-white font-sans">
            <MenuHeader />
            
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-10 p-6">
                <aside className="w-full md:w-64 flex-shrink-0">
                    <div className="sticky top-28">
                        <Sidebar 
                           activeCategory={activeCategory} 
                           setActiveCategory={setActiveCategory} 
                        />
                    </div>
                </aside>

                <main className="flex-1">
                    <h2 className="text-4xl font-black uppercase italic mb-8 border-l-4 border-red-600 pl-4 tracking-tighter">
                        {activeCategory}
                    </h2>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1,2,3,4,5,6].map(i => (
                                <div key={i} className="h-80 bg-zinc-900/50 animate-pulse rounded-3xl border border-white/5" />
                            ))}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-[2rem] bg-zinc-900/20">
                            <p className="text-zinc-500 font-medium text-lg">
                                No <span className="text-white">{activeCategory}</span> available right now.
                            </p>
                            <button 
                                onClick={() => setActiveCategory('pizza')}
                                className="mt-4 text-red-500 text-sm font-bold uppercase tracking-widest hover:text-red-400 transition-colors"
                            >
                                View All Categories
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}