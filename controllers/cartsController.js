const db = require("../db/index");

// Queries
const { selectCarts } = require("../db/cartsQuery");
const {
  insertProductIntoCart,
  selectCartProducts,
  selectProductFromCart,
  updateCartProductsById,
} = require("../db/cartsProductsQuery");
const { selectUserById } = require("../db/usersQuery");

// Error handlers
const {
  duplicateProductError,
  invalidIdError,
  invalidCartProductIdError,
  unavailableProductError,
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
    // If product ID is invalid, postgres will throw a foreign key constraint violation error
    // Indicating that the invalid ID is not present in its associated table
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
const updateCartProduct = async (req, res, next) => {
  const cart_id = req.params.cart_id;
  const { product_id, quantity } = req.body;

  try {
    // Check if the product that's being updated is actually in the user's cart
    const product = await db.query(selectProductFromCart, [
      cart_id,
      product_id,
    ]);
    if (!product.rows.length) {
      unavailableProductError(next);
    } else {
      await db.query(updateCartProductsById, [quantity, cart_id, product_id]);
      res
        .status(200)
        .json({ message: "Product Quantity Updated Seccessfully" });
    }
  } catch (err) {
    // If UUID is invalid postgres will throw the 'INVALID TEXT REPRESENTATION' error
    // Make the error more specific to UUID by accessing err.routine == "string_to_uuid"
    if (err.code == "22P02" && err.routine == "string_to_uuid") {
      invalidCartProductIdError(next);
    } else {
      next(err);
    }
  }
};

// Delete product from cart

module.exports = {
  getCarts,
  addProductToCart,
  getCartProducts,
  updateCartProduct,
};
