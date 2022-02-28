const getAllProducts = async (req, res) => {
  res.status(201).send("Find all test");
};

const getAllProductsStatic = async (req, res) => {
  res.status(201).send("Find all static test");
};

module.exports = { getAllProducts, getAllProductsStatic };
