/*
// tests/app.test.js
import request from "supertest";
import app from "../Server/app.js"; // or "../server.js"

describe("GET /", () => {
  it("returns welcome message", async () => {
    // your test code
  });
});
*/

//twals 
const request = require('supertest');
const app = require('../Server/app.js');

describe('GET /', () => {
  it('returns welcome message', async () => {
    // your test code
  });
});

