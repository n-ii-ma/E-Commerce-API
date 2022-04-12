const express = require("express");
const authRouter = express.Router();

// Controllers
const { register, login } = require("../controllers/authController");

// Validation
const { validateRegisteration } = require("../middlewares/validator");

// Create user
authRouter.post("/register", validateRegisteration, register);

// Login user
authRouter.post("/login", login);

module.exports = authRouter;
