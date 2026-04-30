import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Product from '../models/Product.js';

const router = express.Router();

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage: storage, limits: { fileSize: 5 * 1024 * 1024 } });

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
      image: req.file ? `/uploads/${req.file.filename}` : '',
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

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
      const oldProduct = await Product.findById(req.params.id);
      if (oldProduct?.image) {
        const oldImagePath = path.join(process.cwd(), oldProduct.image);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE: Remove product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.image) {
      const imagePath = path.join(process.cwd(), product.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
    // UPDATED LIST
    const categories = ['pizza', 'burgers', 'wraps', 'pasta', 'sandwich', 'wings', 'drinks', 'family fiesta', 'pizza deals'];
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;