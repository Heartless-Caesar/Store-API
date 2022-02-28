const customErrHandler = require("./middleware/customErrorHandler");
const notFound = require("./middleware/not-found.js");
const connectDB = require("./connect");
const express = require("express");
const app = express();
const port = 5000;

require("express-async-errors");

//app.use("/app");

app.use(notFound);

app.use(express.json());

app.use(customErrHandler);

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
