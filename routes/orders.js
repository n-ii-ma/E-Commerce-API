const express = require("express");
const ordersRouter = express.Router();

// Controllers
const {
  getOrders,
  getOrdersByUserId,
  getOrderProducts,
  getOrderProductsAsAdmin,
} = require("../controllers/ordersController");

// Authentication check
const {
  checkNotAuthenticated,
  checkAdmin,
  checkOwnerOrAdmin,
  checkOrderOwner,
} = require("../middlewares/authMiddleware");

// Get all orders
ordersRouter.get("/", checkNotAuthenticated, checkAdmin, getOrders);

// Get a user's orders
ordersRouter.get(
  "/:user_id",
  checkNotAuthenticated,
  checkOwnerOrAdmin,
  getOrdersByUserId
);

// Get a user's order details
ordersRouter.get(
  "/details/:order_id",
  checkNotAuthenticated,
  checkOrderOwner,
  getOrderProducts
);

// Allow ADMIN to review a user's order details
ordersRouter.get(
  "/review/:order_id",
  checkNotAuthenticated,
  checkAdmin,
  getOrderProductsAsAdmin
);

module.exports = ordersRouter;
