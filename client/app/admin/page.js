"use client";
import { useState, useEffect } from "react";
import AuthForm from "../components/AuthForm"; // Make sure to save the form we made earlier here
import AdminForm from "../components/AdminForm";
import ProductList from "../components/ProductList";

export default function Admin() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [view, setView] = useState("add"); 
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Check for token on load
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setIsAuthorized(true);
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) { console.error(err); }
  };

  const handleEditTrigger = (product) => {
    setSelectedProduct(product);
    setView("add");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await fetch(`${API_URL}/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    setIsAuthorized(false); // Instantly switches back to AuthForm
  };

  // 1. IF NOT AUTHORIZED: Show the nice AuthForm toggle
  if (!isAuthorized) {
    return (
      <AuthForm 
        onAuthSuccess={() => {
          setIsAuthorized(true);
          fetchProducts();
        }} 
      />
    );
  }

  // 2. IF AUTHORIZED: Show the Pizza Bites CMS Dashboard
  return (
    <div className="min-h-screen bg-black text-white flex animate-in fade-in duration-500">
      
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-zinc-800 p-8 flex flex-col gap-2 h-screen sticky top-0">
        <h1 className="text-xl font-black text-orange-500 mb-10 tracking-tighter italic">
          PIZZA BITES <span className="text-white">CMS</span>
        </h1>
        
        <button 
          onClick={() => { setView("add"); setSelectedProduct(null); }}
          className={`text-left p-4 rounded-2xl font-bold transition-all ${view === "add" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-zinc-500 hover:bg-zinc-900"}`}
        >
          Add New Product
        </button>

        <button 
          onClick={() => setView("list")}
          className={`text-left p-4 rounded-2xl font-bold transition-all ${view === "list" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-zinc-500 hover:bg-zinc-900"}`}
        >
          View Product List
        </button>

        <button 
          onClick={() => setView("orders")}
          className={`text-left p-4 rounded-2xl font-bold transition-all ${view === "orders" ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "text-zinc-500 hover:bg-zinc-900"}`}
        >
          Manage Orders
        </button>

        <div className="mt-auto pt-4 border-t border-zinc-800">
          <button 
            onClick={handleLogout}
            className="w-full text-left p-4 rounded-2xl font-bold text-zinc-500 hover:text-red-500 transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-12 overflow-y-auto">
        {view === "add" && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
            <h2 className="text-3xl font-black mb-8 uppercase italic">
              {selectedProduct ? "Edit Existing Item" : "Create New Item"}
            </h2>
            <AdminForm 
              selectedProduct={selectedProduct} 
              onFormSubmit={() => { fetchProducts(); setView("list"); }} 
              clearEdit={() => setSelectedProduct(null)} 
            />
          </div>
        )}

        {view === "list" && (
          <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
            <h2 className="text-3xl font-black mb-8 uppercase italic">Inventory List</h2>
            <ProductList 
              products={products} 
              onEdit={handleEditTrigger} 
              onDelete={handleDelete} 
            />
          </div>
        )}

        {view === "orders" && (
          <div className="flex items-center justify-center h-64 text-zinc-800 font-black text-4xl uppercase italic">
            Orders Coming Soon
          </div>
        )}
      </main>
    </div>
  );
}