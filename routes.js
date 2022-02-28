const express = require("express");
const router = express.Router();
const { getAllProducts, getAllProductsStatic } = require("./controllers");

router.get("/all/Static", getAllProductsStatic);

router.get("/all", getAllProducts);

module.exports = { router };
