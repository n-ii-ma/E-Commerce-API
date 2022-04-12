const express = require("express");
const authRouter = express.Router();

// Controllers
const { register } = require("../controllers/authController");

// Validation
const { validateRegisteration } = require("../middlewares/validator");

// Create user
authRouter.post("/register", validateRegisteration, register);

module.exports = authRouter;
