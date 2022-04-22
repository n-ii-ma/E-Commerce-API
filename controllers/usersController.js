const db = require("../db/index");
const bcrypt = require("bcrypt");

// Queries
const {
  selectUsers,
  selectUserById,
  updateUserCredentialsById,
  updateUserAddressById,
  deleteUserById,
} = require("../db/usersQuery");
const { deleteCartByUserId } = require("../db/cartsQuery");
const { deleteAllCartProducts } = require("../db/cartsProductsQuery");
const { deleteOrderByUserId } = require("../db/ordersQuery");
const { deleteAllOrderProducts } = require("../db/ordersProductsQuery");

// Error handlers
const {
  invalidIdError,
  uniqueViolationError,
} = require("../helpers/errorHandlers");

// Get all users
const getUsers = async (req, res, next) => {
  try {
    const users = await db.query(selectUsers);
    res.status(200).json(users.rows);
  } catch (err) {
    next(err);
  }
};

// Get one user
const getUser = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    const user = await db.query(selectUserById, [user_id]);
    if (!user.rows.length) {
      invalidIdError(next);
    } else {
      // Add the cart_id property to the retrieved user object if the current user id matches the provided id in the parameter
      user.rows[0].cart_id =
        user_id === req.user.user_id ? req.user.cart_id : undefined;

      res.status(200).json(user.rows[0]);
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

// Update user's private info
const updateUserCredentials = async (req, res, next) => {
  const user_id = req.params.user_id;
  const { first_name, last_name, email, password } = req.body;

  try {
    // Check if user with the given id exists
    const user = await db.query(selectUserById, [user_id]);
    if (!user.rows.length) {
      invalidIdError(next);
    } else {
      // Check if password is present in the request body
      // If it is, hash it and set the new hashed password
      // If not, return the same hashed password that was saved in the database
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

      await db.query(updateUserCredentialsById, [
        first_name,
        last_name,
        email,
        hashedPassword,
        user_id,
      ]);
      res.status(200).json({ message: "User Updated Successfully" });
    }
  } catch (err) {
    // If UUID is invalid postgres will throw the 'INVALID TEXT REPRESENTATION' error
    // Make the error more specific to UUID by accessing err.routine == "string_to_uuid"
    if (err.code == "22P02" && err.routine == "string_to_uuid") {
      invalidIdError(next);
      // If UNIQUE constraint is violated
    } else if (err.code == "23505") {
      uniqueViolationError(next);
    } else {
      next(err);
    }
  }
};

// Add or update user's address info
const updateUserAddress = async (req, res, next) => {
  const user_id = req.params.user_id;
  const { address, city, postal_code, phone } = req.body;

  try {
    // Check if user with the given id exists
    const user = await db.query(selectUserById, [user_id]);
    if (!user.rows.length) {
      invalidIdError(next);
    } else {
      await db.query(updateUserAddressById, [
        address,
        city,
        postal_code,
        phone,
        user_id,
      ]);
      res.status(200).json({ message: "User Updated Successfully" });
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

// Delete user
const deleteUser = async (req, res, next) => {
  const user_id = req.params.user_id;

  try {
    // Check if user with the given id exists
    const user = await db.query(selectUserById, [user_id]);
    if (!user.rows.length) {
      invalidIdError(next);
    } else {
      // First, delete all of the products in user's order history
      await db.query(deleteAllOrderProducts, [user_id]);
      // Second, delete all of the order history of that user
      await db.query(deleteOrderByUserId, [user_id]);
      // Third, delete all of the products in user's cart
      await db.query(deleteAllCartProducts, [user_id]);
      // Fourth, delete the cart of that user
      await db.query(deleteCartByUserId, [user_id]);
      // Finally, delete the user
      await db.query(deleteUserById, [user_id]);

      // If the user is Admin, don't log out or delete session after user deletion
      if (req.user.admin) {
        res.status(200).json({ message: "User Deleted Succesfully" });
      } else {
        // If the user is not Admin, log out the deleted user and delete its session and clear its cookie
        req.logout();
        req.session.destroy((err) => {
          if (err) {
            next(err);
          } else {
            res.clearCookie("pg.sessionId");
            res.status(200).json({ message: "User Deleted Succesfully" });
          }
        });
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

module.exports = {
  getUsers,
  getUser,
  updateUserCredentials,
  updateUserAddress,
  deleteUser,
};
