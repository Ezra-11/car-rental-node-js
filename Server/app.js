/*import request from "supertest";
import app from "../app.js"; 

describe("GET /", () => {
  it("returns welcome message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toContain("Welcome");
  });
});
*/

import express from 'express';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send('Welcome'));

// Export app for server and tests
export default app;
module.exports= app;
import userRouter from "./routes/userRoutes.js";

app.use("/api/user", userRouter);

// booking route 
import bookingRouter from "./routes/bookingRoutes.js";

app.use("/api/bookings", bookingRouter);
// owner route 
import ownerRouter from "./routes/ownerRoutes.js";

app.use("/api/owner", ownerRouter);
