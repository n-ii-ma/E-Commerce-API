const express = require("express");
const cartsRouter = express.Router();

// Controllers
const {
  getCarts,
  addProductToCart,
  getCartProducts,
  updateCartProduct,
  deleteCartProduct,
  checkoutCart,
} = require("../controllers/cartsController");

// Validation
const {
  validateAddCartProducts,
  validateUpdCartProducts,
} = require("../middlewares/validator");

// Authentication check
const {
  checkNotAuthenticated,
  checkAdmin,
  checkOwnerOrAdmin,
  checkCartOwner,
} = require("../middlewares/authMiddleware");

// Get all carts
cartsRouter.get("/", checkNotAuthenticated, checkAdmin, getCarts);

// Add product to cart
cartsRouter.post(
  "/:cart_id",
  checkNotAuthenticated,
  checkCartOwner,
  validateAddCartProducts,
  addProductToCart
);

// Get the products from a user's cart
cartsRouter.get(
  "/:user_id",
  checkNotAuthenticated,
  checkOwnerOrAdmin,
  getCartProducts
);

// Update product quantity in cart
cartsRouter.put(
  "/:cart_id",
  checkNotAuthenticated,
  checkCartOwner,
  validateUpdCartProducts,
  updateCartProduct
);

// Delete product from cart
cartsRouter.delete(
  "/:cart_id/products/:product_id",
  checkNotAuthenticated,
  checkCartOwner,
  deleteCartProduct
);

// Checkout
cartsRouter.post(
  "/:cart_id/checkout",
  checkNotAuthenticated,
  checkCartOwner,
  checkoutCart
);

module.exports = cartsRouter;
