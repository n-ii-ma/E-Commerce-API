const express = require("express");
const productsRouter = express.Router();

// Controllers
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

// Validation
const {
  validateProductCreation,
  validateProductUpdate,
} = require("../middlewares/validator");

// Authentication check
const {
  checkNotAuthenticated,
  checkAdmin,
} = require("../middlewares/authMiddleware");

// Create new product
productsRouter.post(
  "/",
  checkNotAuthenticated,
  checkAdmin,
  validateProductCreation,
  createProduct
);

// Get all products
productsRouter.get("/", getProducts);

// Get one product
productsRouter.get("/:product_id", getProduct);

// Update product
productsRouter.put(
  "/:product_id",
  checkNotAuthenticated,
  checkAdmin,
  validateProductUpdate,
  updateProduct
);

// Delete product
productsRouter.delete(
  "/:product_id",
  checkNotAuthenticated,
  checkAdmin,
  deleteProduct
);

module.exports = productsRouter;
