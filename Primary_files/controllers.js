const asyncWrapper = require("./asyncWrapper");

const getAllProducts = asyncWrapper(async (req, res) => {
  res.status(201).send("Find all test");
});

const getAllProductsStatic = asyncWrapper(async (req, res) => {
  res.status(201).send("Find all static test");
});

module.exports = { getAllProducts, getAllProductsStatic };
