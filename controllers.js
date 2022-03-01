const Products = require("./productSchema");

const getAllProductsStatic = async (req, res) => {
  const allProducts = await Products.find({ featured: true });
  res.status(201).json({ content: allProducts });
};

const getProductsQuery = async (req, res) => {
  const { featured, name, price } = req.query;
  const queryObject = {};

  if (name) {
    //IF THE PROVIDED SEARCH NAME EXISTS IT WILL BE FILTERED WITH NO CASE SENSITIVITY
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (price) {
    queryObject.price = price;
  }

  if (featured) {
    //IF THE FEATURED PROPERTY OF THE ELEMENT IS TRUE THE QUERYOBJECT PROPERTY WILL BE TRUE IF NOT IT WILL BE SET TO FALSE
    queryObject.featured = featured === "true" ? true : false;
  }
  res.status(201).send("Find all test");
};

module.exports = { getAllProducts, getAllProductsStatic };
