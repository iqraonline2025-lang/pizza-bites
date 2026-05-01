"use client";
import { useState } from "react";

export default function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // The only email allowed to access this CMS
  const AUTHORIZED_EMAIL = "pizzabitesdinga@gmail.com";

  // Fallback to localhost if env is missing
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Strict Email Check (Frontend Gatekeeper)
    if (formData.email.toLowerCase() !== AUTHORIZED_EMAIL.toLowerCase()) {
      setError("Access Denied: Unauthorized admin email.");
      setLoading(false);
      return;
    }

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
          // Store token and trigger parent success function
          localStorage.setItem("adminToken", data.token);
          onAuthSuccess();
        } else {
          // Switch to login mode after successful signup
          setIsLogin(true);
          setError("Admin account created! Please log in now.");
        }
      } else {
        // Display backend error (e.g., "Invalid credentials" or "Unauthorized")
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("Server connection failed. Is your backend running?");
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
            {isLogin ? "Admin Login" : "Admin Registration"}
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex bg-black p-1 rounded-xl mb-8 border border-zinc-800">
          <button
            type="button"
            onClick={() => { setIsLogin(true); setError(""); }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${isLogin ? "bg-orange-500 text-white shadow-lg" : "text-zinc-500"}`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => { setIsLogin(false); setError(""); }}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${!isLogin ? "bg-orange-500 text-white shadow-lg" : "text-zinc-500"}`}
          >
            Signup
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="pizzabitesdinga@gmail.com"
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white focus:border-orange-500 outline-none transition-all mt-1"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-800 p-4 rounded-xl text-white focus:border-orange-500 outline-none transition-all mt-1"
              value={formData.password}
              onChange={handleChange}
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
            className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all uppercase italic mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : isLogin ? "Enter Dashboard" : "Register Admin"}
          </button>
        </form>
      </div>
    </div>
  );
}