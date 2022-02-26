const { customError } = require("./customErrorHandler");
const notUse = require("not-found.js");
const express = require("express");
const app = express();
const port = 5000;
require("dotenv").config();

app.use(notFound);
app.use(express.json());
app.use(customError);

const start = async () => {
  try {
    await connect;
    app.listen(port, () => {
      console.log(`Port ${port} is listening...`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
