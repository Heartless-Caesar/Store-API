const Products = require("./productSchema");

const getAllProductsStatic = async (req, res) => {
  const allProducts = await Products.find({});
  res.status(201).json({ content: allProducts });
};

const getAllProducts = async (req, res) => {
  res.status(201).send("Find all test");
};

module.exports = { getAllProducts, getAllProductsStatic };
