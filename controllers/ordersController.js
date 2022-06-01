const db = require("../db/index");

// Queries
const {
  selectOrders,
  selectOrdersByUserId,
  selectOrdersByOrderId,
} = require("../db/ordersQuery");
const { selectUserById } = require("../db/usersQuery");
const { selectOrderProductsByOrderId } = require("../db/ordersProductsQuery");

// Error handlers
const { invalidIdError } = require("../helpers/errorHandlers");

// Get all orders
const getOrders = async (req, res, next) => {
  try {
    // Check if order record isn't empty
    const orders = await db.query(selectOrders);
    if (!orders.rows.length) {
      res.status(200).json({ message: "Order Record Is Empty" });
    } else {
      res.status(200).json(orders.rows);
    }
  } catch (err) {
    next(err);
  }
};

// Get a user's orders
const getOrdersByUserId = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    // Check if user with the given id exists
    const user = await db.query(selectUserById, [user_id]);
    if (!user.rows.length) {
      invalidIdError(next);
    } else {
      // Check if order record isn't empty
      const orders = await db.query(selectOrdersByUserId, [user_id]);
      if (!orders.rows.length) {
        res.status(200).json({ message: "Order Record Is Empty" });
      } else {
        res.status(200).json(orders.rows);
      }
    }
  } catch (err) {
    // If UUID is invalid postgres will throw the 'INVALID TEXT REPRESENTATION' error
    // Make the error more specific to UUID by accessing err.routine == "string_to_uuid"
    if (err.code == "22P02" && err.routine == "string_to_uuid") {
      invalidIdError(next);
    } else {
      next(err);
    }
  }
};

// Get a user's order details
const getOrderProducts = async (req, res, next) => {
  const order_id = req.params.order_id;

  try {
    const products = await db.query(selectOrderProductsByOrderId, [order_id]);
    res.status(200).json(products.rows);
  } catch (err) {
    next(err);
  }
};

// Allow ADMIN to review a user's order details
const getOrderProductsAsAdmin = async (req, res, next) => {
  const order_id = req.params.order_id;

  try {
    // Check if any order with the given order_id exists
    const orders = await db.query(selectOrdersByOrderId, [order_id]);
    if (!orders.rows.length) {
      invalidIdError(next);
    } else {
      const products = await db.query(selectOrderProductsByOrderId, [order_id]);
      res.status(200).json(products.rows);
    }
  } catch (err) {
    // If UUID is invalid postgres will throw the 'INVALID TEXT REPRESENTATION' error
    // Make the error more specific to UUID by accessing err.routine == "string_to_uuid"
    if (err.code == "22P02" && err.routine == "string_to_uuid") {
      invalidIdError(next);
    } else {
      next(err);
    }
  }
};

module.exports = {
  getOrders,
  getOrdersByUserId,
  getOrderProducts,
  getOrderProductsAsAdmin,
};
