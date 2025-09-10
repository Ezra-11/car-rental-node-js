import request from "supertest";
import app from "../Server/app.js";

describe("Booking API", () => {
  it("should create a booking", async () => {
    const res = await request(app)
      .post("/api/bookings")
      .send({
        userId: "123",
        carId: "456",
        date: "2025-09-12"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("bookingId");
  });

  it("should prevent double booking of the same car", async () => {
    await request(app).post("/api/bookings").send({
      userId: "123",
      carId: "456",
      date: "2025-09-12"
    });

    const res = await request(app).post("/api/bookings").send({
      userId: "789",
      carId: "456",
      date: "2025-09-12"
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already booked/i);
  });
});
