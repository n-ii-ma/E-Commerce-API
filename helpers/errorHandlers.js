// UNIQUE constraint error
const uniqueViolationError = (next) => {
  const error = new Error("Email Already Exists!");
  error.status = 400;
  next(error);
};

// A UNIQUE constraint error for when a product is already in the cart
const duplicateProductError = (next) => {
  const error = new Error("Product Is Already in Cart!");
  error.status = 400;
  next(error);
};

// Invalid id error
const invalidIdError = (next) => {
  const error = new Error("Invalid ID!");
  error.status = 404;
  next(error);
};

// Invalid id error for when an incorrect cart and/or product id is provided
const invalidCartProductIdError = (next) => {
  const error = new Error("Invalid Cart and/or Product ID!");
  error.status = 404;
  next(error);
};

module.exports = {
  uniqueViolationError,
  duplicateProductError,
  invalidIdError,
  invalidCartProductIdError,
};
