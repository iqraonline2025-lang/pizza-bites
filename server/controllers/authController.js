import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// The only allowed admin email
const AUTHORIZED_ADMIN = "pizzabitesdinga@gmail.com";

// 1. SIGNUP FUNCTION
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // RESTRICTION: Only allow the specific email to sign up
    if (email.toLowerCase() !== AUTHORIZED_ADMIN.toLowerCase()) {
      return res.status(403).json({ message: "Unauthorized: Only the primary admin can create an account." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = new User({ 
      email, 
      password: hashedPassword, 
      role: 'admin' 
    });
    
    await newAdmin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

// 2. LOGIN FUNCTION
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // RESTRICTION: Even if they have an account, only allow this email to log in
    if (email.toLowerCase() !== AUTHORIZED_ADMIN.toLowerCase()) {
      return res.status(403).json({ message: "Access Denied: Restricted to primary admin." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Admin not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};