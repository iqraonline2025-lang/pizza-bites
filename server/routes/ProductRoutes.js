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

// --- GET ROUTES (Fixes the 404 errors) ---

// GET: All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Sidebar Categories
router.get('/sidebar-categories', async (req, res) => {
  try {
    // These must match your Schema enum exactly
    const categories = ['pizza', 'burgers', 'wraps', 'pasta', 'sandwich', 'wings', 'drinks', 'family fiesta', 'pizza deals'];
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- POST/PUT ROUTES (Handles Cloudinary Uploads) ---

// POST: Add new product
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, subCategory, variants } = req.body;
    
    // Safety check for variants
    const parsedVariants = typeof variants === 'string' ? JSON.parse(variants) : variants;

    const newProduct = new Product({
      name,
      description,
      category,
      subCategory,
      // req.file.path is the SECURE URL from Cloudinary
      image: req.file ? req.file.path : '', 
      variants: parsedVariants,
      settings: { hasMealOption: false, mealPrice: 0 } 
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
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
      variants: typeof variants === 'string' ? JSON.parse(variants) : variants
    };

    // If a new image is uploaded, update the URL
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
