// UNIQUE constraint error
const uniqueViolationError = (next) => {
  const error = new Error("Email Already Exists!");
  error.status = 400;
  next(error);
};

// Invalid id error
const invalidIdError = (next) => {
  const error = new Error("Invalid ID!");
  error.status = 404;
  next(error);
};

module.exports = { uniqueViolationError, invalidIdError };
