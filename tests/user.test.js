/*import request from "supertest";
import app from "../Server/app.js";

describe("User API", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/user/register")
      .send({
        name: "John Doe",
        email: "john@example.com",
        password: "password123"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("john@example.com");
  });

  it("should not allow duplicate registration", async () => {
    await request(app).post("/api/user/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123"
    });

    const res = await request(app).post("/api/user/register").send({
      name: "John Doe",
      email: "john@example.com",
      password: "password123"
    });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });
});*/


import request from "supertest";
import app from "../Server/app.js";

describe("User API", () => {
  //  Register user
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/user/register")
      .send({ name: "John Doe", email: "john@example.com", password: "1234" });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("token");
  });

  //  Prevent duplicate registration
  it("should not allow duplicate registration", async () => {
    const res = await request(app)
      .post("/api/user/register")
      .send({ name: "John Doe", email: "john@example.com", password: "1234" });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already exists/i);
  });

  //  Login with correct credentials
  it("should login an existing user", async () => {
    const res = await request(app)
      .post("/api/user/login")
      .send({ email: "john@example.com", password: "1234" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.email).toBe("john@example.com");
  });

  //  Login with wrong password
  it("should reject invalid credentials", async () => {
    const res = await request(app)
      .post("/api/user/login")
      .send({ email: "john@example.com", password: "wrongpass" });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/invalid/i);
  });

  //  Login with non-existing user
  it("should reject login for unregistered user", async () => {
    const res = await request(app)
      .post("/api/user/login")
      .send({ email: "ghost@example.com", password: "1234" });

    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/invalid/i);
  });
});
