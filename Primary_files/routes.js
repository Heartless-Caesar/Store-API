const express = require("express");
const router = express.Router();
const { getAllProducts, getAllProductsStatic } = require("./controllers");

router.get("/all", getAllProducts);

router.get("/all", getAllProductsStatic);

module.exports = { router };
