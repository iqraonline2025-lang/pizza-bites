'use client';
import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";
import MenuHeader from "../components/MenuHeader";

export default function Menu() {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("pizza"); 
    const [loading, setLoading] = useState(true);
    const [isSlow, setIsSlow] = useState(false); // Track long wait times

    useEffect(() => {
        // 1. Start a timer to show a "patience" message if it takes > 5 seconds
        const slowTimer = setTimeout(() => {
            if (loading) setIsSlow(true);
        }, 5000);

        const fetchProducts = async () => {
            setLoading(true);
            
            // 2. Safety check for the API URL
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!apiUrl) {
                console.error("Critical Error: NEXT_PUBLIC_API_URL is not defined.");
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`${apiUrl}/api/products`);
                const data = await res.json();
                
                if (Array.isArray(data)) {
                    setProducts(data);
                } else if (data && typeof data === 'object' && Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    setProducts([]); 
                }
            } catch (err) { 
                console.error("Fetch error:", err); 
                setProducts([]); 
            } finally { 
                setLoading(false); 
                clearTimeout(slowTimer); // Clean up timer
            }
        };

        fetchProducts();

        // Cleanup on unmount
        return () => clearTimeout(slowTimer);
    }, []);

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
                        /* --- SPINNER SECTION --- */
                        <div className="flex flex-col items-center justify-center h-96 text-center">
                            <div className="relative mb-6">
                                <div className="w-16 h-16 rounded-full border-4 border-red-600/20 border-t-red-600 animate-spin"></div>
                                <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-b-zinc-400 animate-spin-slow"></div>
                            </div>
                            
                            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] animate-pulse text-sm">
                                Preparing the Menu
                            </p>

                            {/* Show only if Render is taking its sweet time */}
                            {isSlow && (
                                <p className="mt-4 text-zinc-600 text-xs max-w-[200px] leading-relaxed italic">
                                    Our servers are waking up. <br /> Thanks for your patience!
                                </p>
                            )}
                        </div>
                    ) : filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        /* --- EMPTY STATE --- */
                        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-[2rem] bg-zinc-900/20">
                            <p className="text-zinc-500 font-medium text-lg">
                                No <span className="text-white">{activeCategory}</span> found.
                            </p>
                            <button 
                                onClick={() => setActiveCategory('pizza')}
                                className="mt-4 text-red-500 text-sm font-bold uppercase tracking-widest hover:text-red-400 transition-colors"
                            >
                                Reset Filter
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}