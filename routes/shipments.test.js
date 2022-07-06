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

  /** product ID tests */
  describe("productId tests", function () {
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

    test("productId below 1000", async function () {
      const resp = await request(app).post("/shipments").send({
        productId: 800,
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
      });

      expect(resp.statusCode).toEqual(400);
      expect(resp.body.error.message).toEqual(
        ["instance.productId must be greater than or equal to 1000"]
      );
    });

    test("productId not integer", async function () {
      const resp = await request(app).post("/shipments").send({
        productId: "1000",
        name: "Test Tester",
        addr: "100 Test St",
        zip: "12345-6789",
      });

      expect(resp.statusCode).toEqual(400);
      expect(resp.body.error.message).toEqual(
        ["instance.productId is not of a type(s) integer"]
      );
    });
  });

  /** Name tests */
  describe("name tests", function () {
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

    test("name must be a string", async function () {
      const resp = await request(app).post("/shipments").send({
        productId: 1000,
        name: 800,
        addr: "100 Test St",
        zip: "12345-6789",
      });

      expect(resp.statusCode).toEqual(400);
      expect(resp.body.error.message).toEqual(
        ["instance.name is not of a type(s) string"]
      );
    });
  });

  /** Name tests */
  describe("addr tests", function () {
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

    test("addr must be a string", async function () {
      const resp = await request(app).post("/shipments").send({
        productId: 1000,
        name: "Test Tester",
        addr: 100,
        zip: "12345-6789",
      });

      expect(resp.statusCode).toEqual(400);
      expect(resp.body.error.message).toEqual(
        ["instance.addr is not of a type(s) string"]
      );
    });
  });

  /** Zip tests */
  describe("zip tests", function () {
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

    test("zip must be string", async function () {
      const resp = await request(app).post("/shipments").send({
        productId: 1000,
        name: "Test Tester",
        addr: "100 Test St",
        zip: 12345,
      });

      expect(resp.statusCode).toEqual(400);
      expect(resp.body.error.message).toEqual(
        ["instance.zip is not of a type(s) string"]
      );
    });
  });



});
