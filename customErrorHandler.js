const { customError } = require("./customError");

const customErrHandler = (err, req, res, next) => {
  if (err instanceof customError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "An error ocurred" });
};

module.exports = customErrHandler;
