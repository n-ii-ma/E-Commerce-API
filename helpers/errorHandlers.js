// UNIQUE constraint error
const uniqueViolationError = (next) => {
  const error = new Error("Email Already Exists!");
  error.status = 400;
  next(error);
};

module.exports = { uniqueViolationError };
