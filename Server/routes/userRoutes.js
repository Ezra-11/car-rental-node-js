/*import express from 'express';
import { getCars, getUserData, loginUser, registerUser } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/data', protect, getUserData);
userRouter.get('/cars', getCars);

export default userRouter; */

//
import express from "express";
const router = express.Router();

// In-memory users array for testing
let users = [];

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Add new user
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);

  // Respond with success
  res.status(201).json({ user: newUser, token: "dummy-token" });
});

//login user
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json({
    user,
    token: "fake-jwt-token"
  });
});

export default router;


