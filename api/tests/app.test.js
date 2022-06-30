const request = require("supertest");
const app = require("../src/app");

describe("Testing the app", () => {
  test("GET /healthcheck works", async () => {
    const response = await request(app).get("/healthcheck");
    expect(response.statusCode).toBe(200);
  });

  test("GET /products works", async () => {
    const response = await request(app).get("/products");

    expect(typeof response.body[0].id).toBe("string");
    expect(typeof response.body[0].appId).toBe("string");
    expect(typeof response.body[0].inSubscription).toBe("boolean");
    expect(typeof response.body[0].title).toBe("string");
    expect(typeof response.body[0].subtitle).toBe("string");
    expect(typeof response.body[0].description).toBe("string");
    expect(typeof response.body[0].subscription).toBe("string");

    expect(response.statusCode).toBe(200);
  });

  test("GET /products/:id/plans works w/ correct id", async () => {
    const response = await request(app).get("/products/trip-trends/plans");

    expect(typeof response.body[0].ID).toBe("string");
    expect(typeof response.body[0]["Plan Name"]).toBe("string");
    expect(typeof response.body[0]["Billing Cycle"]).toBe("string");
    expect(typeof response.body[0].Name).toBe("string");
    expect(typeof response.body[0].Type).toBe("string");
    expect(typeof response.body[0].Description).toBe("string");

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

    const userInfo = response.body;

    expect(typeof userInfo.id).toBe("string");
    expect(typeof userInfo.email).toBe("string");
    expect(typeof userInfo.firstName).toBe("string");
    expect(typeof userInfo.lastName).toBe("string");
    expect(typeof userInfo.parents).toBe("string");

    expect(typeof userInfo.accessToken.token).toBe("string");
    expect(typeof userInfo.accessToken.expiry).toBe("string");

    const preferences = userInfo.preferences.global;

    expect(typeof preferences.locale).toMatch(/^string$|^object$/gm);
    expect(typeof preferences.dateFormat).toMatch(/^string$|^object$/gm);
    expect(typeof preferences.timeFormat).toMatch(/^string$|^object$/gm);
    expect(typeof preferences.timeZone).toMatch(/^string$|^object$/gm);
    expect(typeof preferences.units).toMatch(/^string$|^object$/gm);

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
