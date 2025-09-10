/*import express from 'express';
import { changeBookingStatus, checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings } from '../controllers/bookingController.js';
import {protect} from "../middleware/auth.js";

const bookingRouter = express.Router();


bookingRouter.post('/check-availability', checkAvailabilityOfCar);
bookingRouter.post('/create', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/owner', protect, getOwnerBookings);
bookingRouter.post('/change-status', protect, changeBookingStatus);

export default bookingRouter;
*/

import express from "express";
const router = express.Router();

// In-memory bookings array
let bookings = [];

router.post("/", (req, res) => {
  const { userId, carId, date } = req.body;

  // Check if the car is already booked on the same date
  const existingBooking = bookings.find(
    b => b.carId === carId && b.date === date
  );

  if (existingBooking) {
    return res.status(400).json({ message: "Car already booked for this date" });
  }

  const newBooking = { bookingId: Date.now(), userId, carId, date };
  bookings.push(newBooking);

  res.status(201).json(newBooking);
});

export default router;
