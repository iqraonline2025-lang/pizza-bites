"use client";
import { useState } from "react";

export default function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fallback to localhost if env is missing
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // FIXED: Added /api/auth here so it hits the correct backend route
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    
    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        if (isLogin) {
          localStorage.setItem("adminToken", data.token);
          onAuthSuccess();
        } else {
          setIsLogin(true); // Switch to login after successful signup
          setError("Admin created! Now please log in.");
        }
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-10 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-orange-500 italic tracking-tighter">
            PIZZA BITES <span className="text-white">CMS</span>
          </h1>
          <p className="text-zinc-500 mt-2 font-bold uppercase text-xs tracking-widest">
            Admin Portal
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex bg-black p-1 rounded-xl mb-8 border border-zinc-800">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${isLogin ? "bg-orange-500 text-white shadow-lg" : "text-zinc-500"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${!isLogin ? "bg-orange-500 text-white shadow-lg" : "text-zinc-500"}`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Email</label>
            <input
              type="email"
              placeholder="admin@pizzabites.com"
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white focus:border-orange-500 outline-none transition-all mt-1"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white focus:border-orange-500 outline-none transition-all mt-1"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {error && (
            <div className={`p-3 rounded-lg text-sm font-bold text-center ${error.includes('created') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all uppercase italic mt-4"
          >
            {loading ? "Processing..." : isLogin ? "Enter Dashboard" : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
}