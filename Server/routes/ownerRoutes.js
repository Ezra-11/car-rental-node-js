/*import express from 'express';
import { protect } from '../middleware/auth.js';
import { addCar, changeRoleToOwner, deleteCar, getDashboardData, getOnwerCars, toggleCarAvailability, updateUserImage } from '../controllers/ownerController.js';
import upload from '../middleware/multer.js';

const ownerRouter = express.Router();

ownerRouter.post("/change-role",protect, changeRoleToOwner);
ownerRouter.post("/add-car",upload.single("image"),protect, addCar);
ownerRouter.get("/cars",protect, getOnwerCars);
ownerRouter.post("/toggle-car",protect, toggleCarAvailability);
ownerRouter.post("/delete-cars",protect, deleteCar);
ownerRouter.get("/dashboard",protect, getDashboardData);
ownerRouter.post("/update-image", upload.single("image"), protect, updateUserImage);

export default ownerRouter;*/

import express from "express";
const router = express.Router();

// In-memory owners and cars
let owners = [];
let cars = [];

// Register owner (optional)
router.post("/register", (req, res) => {
  const { name, email } = req.body;
  const existingOwner = owners.find(o => o.email === email);
  if (existingOwner) {
    return res.status(400).json({ message: "Owner already exists" });
  }
  const newOwner = { id: Date.now(), name, email };
  owners.push(newOwner);
  res.status(201).json(newOwner);
});

// Add a car
router.post("/cars", (req, res) => {
  const { ownerId, make, model, plateNumber } = req.body;

  const ownerExists = owners.find(o => o.id === ownerId);
  if (!ownerExists) {
    return res.status(404).json({ message: "Owner not found" });
  }

  const newCar = { carId: Date.now(), ownerId, make, model, plateNumber };
  cars.push(newCar);
  res.status(201).json(newCar);
});

// Update a car
router.put("/cars/:carId", (req, res) => {
  const { carId } = req.params;
  const car = cars.find(c => c.carId == carId);
  if (!car) return res.status(404).json({ message: "Car not found" });

  Object.assign(car, req.body);
  res.status(200).json(car);
});

// Delete a car
router.delete("/cars/:carId", (req, res) => {
  const { carId } = req.params;
  const index = cars.findIndex(c => c.carId == carId);
  if (index === -1) return res.status(404).json({ message: "Car not found" });

  cars.splice(index, 1);
  res.status(200).json({ message: "Car deleted" });
});

export default router;
