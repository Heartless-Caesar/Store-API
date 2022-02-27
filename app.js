const express = require("express");
const app = express();
const notFound = require("not-found.js");
const customErrorHandler = require("./customErrorHandler");
const connectDB = require("./connect");
const port = process.env.PORT || 5000;

app.use("/app");

app.use(notFound);

app.use(express.json());

app.use(customErrorHandler);

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
