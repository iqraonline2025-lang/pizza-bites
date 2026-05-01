import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Product from '../models/Product.js';

const router = express.Router();

// --- CLOUDINARY CONFIG ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// --- CLOUDINARY STORAGE SETUP ---
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pizza-bites-products',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

// GET: All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Add new product
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, subCategory, variants } = req.body;

    // 1. Safety check for variants (Prevents JSON.parse crash)
    let parsedVariants = [];
    if (variants) {
      try {
        parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;
      } catch (parseErr) {
        return res.status(400).json({ error: "Invalid format for variants." });
      }
    }

    // 2. Construct product object
    const newProduct = new Product({
      name,
      description,
      category,
      subCategory,
      // Use the Cloudinary URL if file exists, else empty string
      image: req.file ? req.file.path : '', 
      variants: parsedVariants,
      settings: { hasMealOption: false, mealPrice: 0 } 
    });

    const savedProduct = await newProduct.save();
    console.log("Product saved successfully:", savedProduct._id);
    res.status(201).json(savedProduct);

  } catch (err) {
    // 3. Log the specific error to Render console so you can debug
    console.error("BACKEND ERROR ON /ADD:", err);
    res.status(500).json({ 
      error: "Internal Server Error", 
      details: err.message 
    });
  }
});

// PUT: Update existing product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, subCategory, variants } = req.body;
    
    const updateData = {
      name,
      description,
      category,
      subCategory,
      variants: variants ? (typeof variants === 'string' ? JSON.parse(variants) : variants) : []
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("BACKEND ERROR ON /UPDATE:", err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove product
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
