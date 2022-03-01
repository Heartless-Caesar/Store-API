const Products = require("./models/productSchema");

const getAllProductsStatic = async (req, res) => {
  //GET ALL OBJECTS AND SORT THEM ALPHABETICALLY AND NUMERICALLY
  const allProducts = await Products.find({}).sort("name, price");
  res.status(201).json({ content: allProducts });
};

//SEARCH FUNCTIONALITY
const getProductsQuery = async (req, res) => {
  const { featured, name, company, sort } = req.query;
  //OBJECT TO SERVE AS THE QUERIED OUTPUT
  const queryObject = {};

  if (name) {
    //IF THE PROVIDED SEARCH NAME EXISTS IT WILL BE FILTERED WITH NO CASE SENSITIVITY
    queryObject.name = { $regex: name, $options: "i" };
  }

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    //IF THE FEATURED PROPERTY OF THE ELEMENT IS TRUE THE QUERYOBJECT PROPERTY WILL BE TRUE IF NOT FALSE
    queryObject.featured = featured === "true" ? true : false;
  }
  //ALL FOUND OBJECTS THAT MATCH THE PARAMETERS SPECIFIED IN THE QUERY PARAMS
  let result = Products.find(queryObject);

  if (sort) {
    //THE SORTED DOCUMENTS WILL BE SET IN A FILTERED ARRAY
    const sortedList = sort.split(",").join(" ");
    //RESULTING SORTED DOCUMENTS
    result = result.sort(sortedList);
  } else {
    result = result.sort("createAt");
  }

  //QUERIED AND SORTED DOCUMENTS IF SET TO DO SO
  const products = await result;

  res.status(201).json({ foundProducts: products, numHits: products.length });
};

module.exports = { getProductsQuery, getAllProductsStatic };
