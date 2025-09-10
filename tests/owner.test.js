import request from "supertest";
import app from "../Server/app.js";

describe("Owner API", () => {
  let ownerId;
  let carId;
// register new owner 
  it("should register a new owner", async () => {
    const res = await request(app)
      .post("/api/owner/register")
      .send({ name: "Alice", email: "alice@example.com" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    ownerId = res.body.id;
  });
// add a new car 
  it("should add a new car", async () => {
    const res = await request(app)
      .post("/api/owner/cars")
      .send({ ownerId, make: "Toyota", model: "Corolla", plateNumber: "ABC123" });

       expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("carId");
    carId = res.body.carId;
  });

    
// update car 
  it("should update the car", async () => {
    const res = await request(app)
      .put(`/api/owner/cars/${carId}`)
      .send({ model: "Camry" });

    expect(res.status).toBe(200);
    expect(res.body.model).toBe("Camry");
  });
// delete the car 
  it("should delete the car", async () => {
    const res = await request(app)
      .delete(`/api/owner/cars/${carId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});