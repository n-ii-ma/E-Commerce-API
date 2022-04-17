const express = require("express");
const authRouter = express.Router();

// Controllers
const { register, login, logout } = require("../controllers/authController");

// Validation
const {
  validateRegisteration,
  validateLogin,
} = require("../middlewares/validator");

// Authentication check
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../middlewares/authMiddleware");

// Register new user
authRouter.post(
  "/register",
  checkAuthenticated,
  validateRegisteration,
  register
);

// Login user
authRouter.post("/login", checkAuthenticated, validateLogin, login);

// Logout user
authRouter.post("/logout", checkNotAuthenticated, logout);

module.exports = authRouter;
