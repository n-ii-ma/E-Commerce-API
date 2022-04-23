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

// Invalid id error for when an incorrect product id is provided in cart
const invalidCartProductIdError = (next) => {
  const error = new Error("Invalid Product ID!");
  error.status = 404;
  next(error);
};

// When cart is empty
const emptyCartError = (next) => {
  const error = new Error("Cart Is Empty!");
  error.status = 400;
  next(error);
};

// Product not available in cart
const unavailableProductError = (next) => {
  const error = new Error("Product Not Avaialable in Cart!");
  error.status = 404;
  next(error);
};

// When shipping address hasn't been provided before checkout
const missingAddressError = (next) => {
  const error = new Error("Shipping Address Has Not Been Provided!");
  error.status = 400;
  next(error);
};

// When order record is empty
const emptyOrderRecordError = (next) => {
  const error = new Error("Order Record Is Empty!");
  error.status = 404;
  next(error);
};

module.exports = {
  uniqueViolationError,
  duplicateProductError,
  invalidIdError,
  invalidCartProductIdError,
  emptyCartError,
  unavailableProductError,
  missingAddressError,
  emptyOrderRecordError,
};
