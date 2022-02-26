const { customError } = require("./customErrorClass");

const customErrorHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).send("An error ocurred");
};

module.exports = { customErrorHandler };
