const express = require("express");
const usersRouter = express.Router();

// Controllers
const {
  getUsers,
  getUser,
  updateUserCredentials,
  updateUserAddress,
  deleteUser,
} = require("../controllers/usersController");

// Authentication check
const {
  checkNotAuthenticated,
  checkAdmin,
  checkOwnerOrAdmin,
} = require("../middlewares/authMiddleware");

// Validation
const {
  validateCredentialsUpdate,
  validateAddressUpdate,
} = require("../middlewares/validator");

// Get all users
usersRouter.get("/", checkNotAuthenticated, checkAdmin, getUsers);

// Get one user
usersRouter.get("/:user_id", checkNotAuthenticated, checkOwnerOrAdmin, getUser);

// Update user's private info
usersRouter.put(
  "/credentials/:user_id",
  checkNotAuthenticated,
  checkOwnerOrAdmin,
  validateCredentialsUpdate,
  updateUserCredentials
);

// Add or update user's address info
usersRouter.put(
  "/address/:user_id",
  checkNotAuthenticated,
  checkOwnerOrAdmin,
  validateAddressUpdate,
  updateUserAddress
);

// Delete user
usersRouter.delete(
  "/:user_id",
  checkNotAuthenticated,
  checkOwnerOrAdmin,
  deleteUser
);

module.exports = usersRouter;
