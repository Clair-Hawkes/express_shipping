"use strict";

const jsonschema = require("jsonschema");
const shipmentSchema = require("../schemas/shipmentSchema.json");

const { BadRequestError } = require("../expressError");

const express = require("express");
const router = new express.Router();

const { shipProduct } = require("../shipItApi");

/** POST /ship
 *
 * VShips an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const { productId, name, addr, zip } = req.body;
  const shipment = { productId, name, addr, zip };

  const result = jsonschema.validate(
    shipment, 
    shipmentSchema, 
    { required: true }
  );
  
  if (!result.valid) {
    // pass validation errors to error handler
    //  (the "stack" key is generally the most useful)
    const errs = result.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const shipId = await shipProduct({ productId, name, addr, zip });
  return res.json({ shipped: shipId });

});


module.exports = router;