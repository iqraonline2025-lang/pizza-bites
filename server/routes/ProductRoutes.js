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

// POST: Add new product
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, subCategory, variants } = req.body;
    const parsedVariants = JSON.parse(variants);

    const newProduct = new Product({
      name,
      description,
      category,
      subCategory,
      // req.file.path contains the full https://res.cloudinary.com URL
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
      variants: JSON.parse(variants)
    };

    // Correctly update the image URL if a new file is uploaded
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;