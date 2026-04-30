import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/signup
router.post('/signup', registerAdmin);

// POST /api/auth/login
router.post('/login', loginAdmin);

export default router;