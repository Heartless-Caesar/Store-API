const asyncWrapper = require("./asyncWrapper");

const getAllProducts = asyncWrapper(async (req, res) => {
  res.status(201).send("Find all test");
});

module.exports = { getAllProducts };
