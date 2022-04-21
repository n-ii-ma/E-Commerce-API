const db = require("../db/index");

// Queries
const { selectCarts } = require("../db/cartsQuery");
const {
  insertProductIntoCart,
  selectCartProducts,
} = require("../db/cartsProductsQuery");
const { selectUserById } = require("../db/usersQuery");

// Error handlers
const {
  duplicateProductError,
  invalidIdError,
  invalidCartProductIdError,
} = require("../helpers/errorHandlers");

// Get all carts
const getCarts = async (req, res, next) => {
  try {
    const carts = await db.query(selectCarts);
    res.status(200).json(carts.rows);
  } catch (err) {
    next(err);
  }
};

// Add product to cart
const addProductToCart = async (req, res, next) => {
  const cart_id = req.params.cart_id;
  const { product_id, quantity } = req.body;

  try {
    await db.query(insertProductIntoCart, [cart_id, product_id, quantity]);
    res.status(200).json({ message: "Product Added to Cart" });
  } catch (err) {
    // If UUID is invalid postgres will throw the 'INVALID TEXT REPRESENTATION' error
    // Make the error more specific to UUID by accessing err.routine == "string_to_uuid"
    // If Cart and/or product IDs are invalid, postgres will throw a foreign key constraint violation error
    // Indicating that the invalid IDs are not present in their associated tables
    if (
      (err.code == "22P02" && err.routine == "string_to_uuid") ||
      err.code == "23503"
    ) {
      invalidCartProductIdError(next);
      // If the same product is being added to the cart again
    } else if (err.code == "23505") {
      duplicateProductError(next);
    } else {
      next(err);
    }
  }
};

// Get the products from a user's cart
const getCartProducts = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    // Check if user with the given id exists
    const user = await db.query(selectUserById, [user_id]);
    if (!user.rows.length) {
      return invalidIdError(next);
    }

    const products = await db.query(selectCartProducts, [user_id]);
    if (!products.rows.length) {
      res.status(200).json({ message: "Cart Is Empty" });
    } else {
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

// Update product quantity in cart

// Delete product from cart

module.exports = { getCarts, addProductToCart, getCartProducts };
