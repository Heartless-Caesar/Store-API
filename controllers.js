const Products = require("./models/productSchema");

const getAllProductsStatic = async (req, res) => {
  //GET ALL OBJECTS AND SORT THEM ALPHABETICALLY AND NUMERICALLY
  const allProducts = await Products.find({}).sort("name, price");
  res.status(201).json({ content: allProducts });
};

//SEARCH FUNCTIONALITY
const getProductsQuery = async (req, res) => {
  const { featured, name, company, sort, fields, numericFields } = req.query;

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

    //RESULTING SORTED DOCUMENTS, EITHER ALPHABETICAL OR NUMERICALLY
    result = result.sort(sortedList);
  } else {
    result = result.sort("createAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    //THE SELECT OPERATOR WILL DISPLAY ONLY THE ELEMENTS DESIRED IN THE FIELDS PARAM
    result = result.select(fieldsList);
  }

  //WILL FILTER BASED ON THE OPERATOR USED AND THE VALUE PROVIDED
  //EXAMPLE: ?numericFields=price>20
  if (numericFields) {
    //ALL OPERATORS FOR THE NUMERIC FILTERING
    const operators = {
      ">": "$gt",
      "<": "$lt",
      "=": "$eq",
      "<=": "$lte",
      ">=": "$gte",
    };

    const regex = /\b(<|>|<=|>=|=)\b/g;

    //REPLACES THE OPERATOR STRING WITH THE VALUE INTERPRETED BY MONGOOSE
    let filters = numericFields.replace(
      regex,
      (match) => `-${operators[match]}-`
    );

    //INSERT THE PARAMETERS FOR THE NUMERIC FILTERING
    const options = ["rating", "price"];

    //FINDS EVERY JSON DEFINED DOCUMENT IN MONGO
    filters = filters.split(",").forEach((item) => {
      //SEPARATING THE PROPERY ELEMENTS THAT APPEAR IN THE OUTPUT
      const [field, operator, value] = item.split("-");

      //QUERYING THE DATABASE FOR THE GIVEN NUMERIC FIELD PARAMETERS
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  //QUERIED AND SORTED DOCUMENTS IF SET TO
  const products = await result;

  res.status(201).json({ foundProducts: products, numHits: products.length });
};

module.exports = { getProductsQuery, getAllProductsStatic };
