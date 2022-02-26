class customError extends Error {
  cosntructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const customErrorInstance = (msg, statusCode) => {
  return new customError(msg, statusCode);
};

module.exports = { customError, customErrorInstance };
