"use client";
import { useState, useEffect } from "react";

const AdminForm = ({ selectedProduct, onFormSubmit, clearEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "pizza",
    variants: [
      { size: "Small", price: "" },
      { size: "Medium", price: "" },
      { size: "Large", price: "" },
    ],
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        category: selectedProduct.category,
        variants: selectedProduct.variants,
      });
    }
  }, [selectedProduct]);

  // --- UPDATED CATEGORY LOGIC ---
  const handleCategoryChange = (cat) => {
    let newVariants = [];
    
    if (cat === "burgers" || cat === "wraps" || cat === "sandwich") {
      newVariants = [
        { size: "Single", price: "" },
        { size: "Meal", price: "" }
      ];
    } else if (cat === "pizza") {
      newVariants = [
        { size: "Small", price: "" },
        { size: "Medium", price: "" },
        { size: "Large", price: "" }
      ];
    } else if (cat === "pasta") {
      newVariants = [
        { size: "Small", price: "" },
        { size: "Large", price: "" }
      ];
    } else if (cat === "wings") {
      newVariants = [
        { size: "6 Pcs", price: "" },
        { size: "12 Pcs", price: "" }
      ];
    } else {
      newVariants = [{ size: "Standard", price: "" }];
    }
    
    setFormData({ ...formData, category: cat, variants: newVariants });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("variants", JSON.stringify(formData.variants));
    if (imageFile) data.append("image", imageFile);

    const endpoint = selectedProduct 
      ? `${API_URL}/api/products/${selectedProduct._id}` 
      : `${API_URL}/api/products/add`;
    
    const method = selectedProduct ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method: method,
        body: data,
      });
      if (res.ok) {
        alert(selectedProduct ? "Product updated!" : "Product added!");
        resetForm();
        if (onFormSubmit) onFormSubmit();
      }
    } catch (err) {
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "pizza",
      variants: [
        { size: "Small", price: "" },
        { size: "Medium", price: "" },
        { size: "Large", price: "" },
      ],
    });
    setImageFile(null);
    if (clearEdit) clearEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 p-8 rounded-3xl border border-zinc-800 text-white w-full shadow-2xl">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-orange-500 uppercase tracking-wider">
          {selectedProduct ? "Edit Product" : "Add New Product"}
        </h2>
        {selectedProduct && (
          <button 
            type="button" 
            onClick={resetForm}
            className="text-xs bg-zinc-800 px-3 py-1 rounded-full text-zinc-400 hover:text-white"
          >
            Cancel Edit
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          className="bg-zinc-800 p-4 rounded-2xl outline-none border border-zinc-700 focus:border-orange-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        
        {/* UPDATED SELECT OPTIONS */}
        <select
          className="bg-zinc-800 p-4 rounded-2xl outline-none border border-zinc-700 cursor-pointer"
          value={formData.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="pizza">Pizza</option>
          <option value="burgers">Burgers</option>
          <option value="wraps">Wraps</option>
          <option value="pasta">Pasta</option>
          <option value="wings">Wings</option>
          <option value="sandwich">Sandwich</option>
          <option value="drinks">Drinks</option>
          <option value="family fiesta">Family Fiesta</option>
          <option value="pizza deals">Pizza Deals</option>
        </select>
      </div>

      <textarea
        placeholder="Product Description (e.g., ingredients, flavors...)"
        className="w-full bg-zinc-800 p-4 rounded-2xl outline-none border border-zinc-700 focus:border-orange-500 h-24 resize-none"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-zinc-400 uppercase">Product Image</label>
        <input
          type="file"
          accept="image/*"
          className="bg-zinc-800 p-3 rounded-xl border border-zinc-700 file:bg-orange-500 file:text-white file:border-0 file:rounded-lg file:px-3 file:py-1 cursor-pointer"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Pricing Configuration (Rs.)
        </label>
        {formData.variants.map((v, i) => (
          <div key={i} className="flex items-center gap-4 bg-black/20 p-4 rounded-2xl border border-zinc-800">
            <span className="w-24 text-xs text-orange-500 font-bold uppercase">{v.size}</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-bold">Rs.</span>
              <input
                type="number"
                placeholder="0.00"
                className="w-full bg-zinc-800 pl-12 pr-4 py-3 rounded-xl outline-none border border-zinc-700 focus:border-orange-500 transition-all"
                value={v.price}
                onChange={(e) => {
                  const updated = [...formData.variants];
                  updated[i].price = e.target.value;
                  setFormData({ ...formData, variants: updated });
                }}
                required
              />
            </div>
          </div>
        ))}
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-700 py-4 rounded-2xl font-bold text-white transition-all shadow-lg shadow-orange-500/20 uppercase tracking-widest"
      >
        {loading ? "Saving..." : selectedProduct ? "Update Product" : "Save Product"}
      </button>
    </form>
  );
};

export default AdminForm;