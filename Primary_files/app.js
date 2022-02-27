const { customError } = require("./customErrorHandler");
const notFound = require("not-found.js");
const express = require("express");
const connectDB = require("./connect");
const app = express();
const port = process.env.PORT || 5000;

app.use(notFound);
app.use(express.json());
app.use(customError);
app.use("/app");

//MAIN PAGE ROUTES
app.get("/products", (req, res) => {
  res
    .status(201)
    .send('<h1>Store API</h1><br><a href="/app/products">Products</a>');
});

const start = async () => {
  try {
    await connectDB;
    app.listen(port, () => {
      console.log(`Port ${port} is listening...`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
