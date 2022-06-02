const express = require("express");
const paymentRouter = express.Router();

// Controller
const payment = require("../controllers/paymentController");

// Authentication check
const { checkNotAuthenticated } = require("../middlewares/authMiddleware");

// Payment
paymentRouter.post("/create-payment-intent", checkNotAuthenticated, payment);

module.exports = paymentRouter;
