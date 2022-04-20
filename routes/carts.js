const express = require("express");
const cartsRouter = express.Router();

// Controllers
const {
  getCarts,
  addProductToCart,
  getCartProducts,
} = require("../controllers/cartsController");

// Validation
const { validateCartProducts } = require("../middlewares/validator");

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
cartsRouter.post("/:cart_id", validateCartProducts, addProductToCart);

// Get the products from a user's cart
cartsRouter.get(
  "/:user_id",
  checkNotAuthenticated,
  checkOwnerOrAdmin,
  getCartProducts
);

// Update product quantity in cart

// Delete product from cart

module.exports = cartsRouter;
