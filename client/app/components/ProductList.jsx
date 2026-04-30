"use client";

const ProductList = ({ products, onEdit, onDelete }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  return (
    <div className="space-y-6">
      {/* Header for the List */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">
          Live Menu <span className="text-orange-500">Inventory</span>
        </h3>
        <span className="bg-zinc-800 text-zinc-400 text-[10px] px-3 py-1 rounded-full font-bold">
          {products.length} ITEMS
        </span>
      </div>

      <div className="grid gap-4">
        {products.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-3xl text-zinc-600 font-bold uppercase text-xs">
            No products found. Add one on the left.
          </div>
        ) : (
          products.map((product) => (
            <div 
              key={product._id} 
              className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-3xl flex items-center gap-6 group hover:border-orange-500/30 transition-all"
            >
              {/* Product Image */}
              <div className="w-16 h-16 bg-black rounded-2xl overflow-hidden border border-zinc-800 flex-shrink-0">
                <img 
                  src={`${API_URL}${product.image}`} 
                  alt="" 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <h4 className="font-bold text-white uppercase text-sm">{product.name}</h4>
                <div className="flex gap-2 mt-1">
                  {product.variants.map((v, idx) => (
                    <span key={idx} className="text-[9px] bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded">
                      {v.size}: Rs.{v.price}
                    </span>
                  ))}
                </div>
              </div>

              {/* ACTION BUTTONS: This is what you were looking for */}
              <div className="flex gap-2">
                <button 
                  onClick={() => onEdit(product)}
                  className="w-9 h-9 rounded-lg bg-zinc-800 text-blue-400 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"
                  title="Edit"
                >
                  Edit
                </button>
                <button 
                  onClick={() => onDelete(product._id)}
                  className="w-9 h-9 rounded-lg bg-zinc-800 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                  title="Delete"
                >
                  Del
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;