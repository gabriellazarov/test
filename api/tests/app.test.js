const request = require("supertest");
const app = require("../src/app");

describe("Testing the app", () => {
  test("GET /healthcheck works", async () => {
    const response = await request(app).get("/healthcheck");
    expect(response.statusCode).toBe(200);
  });

  test("GET /products works", async () => {
    const response = await request(app).get("/products");
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.statusCode).toBe(200);
  });

  test("GET /products/:id/plans works w/ correct id", async () => {
    const response = await request(app).get("/products/trip-trends/plans");
    expect(response.body).toBeInstanceOf(Array);
    expect(response.statusCode).toBe(200);
  });

  test("GET /products/:id/plans DOESN'T work w/ INcorrect id", async () => {
    const response = await request(app).get("/products/wrong-id/plans");
    expect(response.statusCode).toBe(404);
  });

  test("POST /login works w/ correct credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "latekoc917@qqhow.com", password: "123456" });
    expect(response.statusCode).toBe(200);
  });

  test("POST /login DOESN't work w/ INcorrect credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ username: "latekoc917@qqhow.com", password: "wrong-pass" });
    expect(response.statusCode).toBe(401);
  });

  test("POST /login DOESN't work w/ missing credentials", async () => {
    const response1 = await request(app)
      .post("/login")
      .send({ username: "latekoc917@qqhow.com", password: "" });
    expect(response1.statusCode).toBe(400);

    const response2 = await request(app)
      .post("/login")
      .send({ username: "", password: "123456" });
    expect(response2.statusCode).toBe(400);
  });
});
