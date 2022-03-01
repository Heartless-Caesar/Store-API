const express = require("express");
const router = express.Router();
const { getProductsQuery, getAllProductsStatic } = require("./controllers");

router.get("/all/Static", getAllProductsStatic);

router.get("/all", getProductsQuery);

module.exports = { router };
