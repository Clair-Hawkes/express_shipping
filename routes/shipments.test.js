"use strict";

const request = require("supertest");
const app = require("../app");

  /** POST / => { shipped: shipId } */

  describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("Missing productId", async function () {
    const resp = await request(app).post("/shipments").send({
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual(
      ["instance requires property \"productId\""]
    );
  });

  test("Missing name", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      addr: "100 Test St",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual(
      ["instance requires property \"name\""]
    );
  });

  test("Missing addr", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      zip: "12345-6789",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual(
      ["instance requires property \"addr\""]
    );
  });


  test("Missing zip", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
    });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual(
      ["instance requires property \"zip\""]
    );
  });




});
