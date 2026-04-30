import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    required: true, 
    // UPDATED ENUM
    enum: ['pizza', 'burgers', 'wraps', 'pasta', 'sandwich', 'wings', 'drinks', 'family fiesta', 'pizza deals'] 
  },
  subCategory: { type: String }, 
  image: { type: String },
  
  variants: [{
    size: { type: String, required: true }, 
    price: { type: Number, required: true }
  }],

  settings: {
    hasMealOption: { type: Boolean, default: false },
    mealPrice: { type: Number, default: 0 }
  }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);
export default Product;