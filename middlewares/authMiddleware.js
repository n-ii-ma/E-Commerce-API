// Check if user is authenticated
const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(400).json({ message: "Already Logged In!" });
  } else {
    next();
  }
};

// Check if user is not authenticated
const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Not Authorized to View or Edit the Content!" });
  }
};

// Check if the user is the Admin
const checkAdmin = (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Not Authorized to View or Edit the Content!" });
  }
};

// Check if the user is the owner of the account (already logged in user) or the admin
const checkOwnerOrAdmin = (req, res, next) => {
  if (req.user.user_id === req.params.user_id || req.user.admin) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Not Authorized to View or Edit the Content!" });
  }
};

// Check if the user is the owner of the cart
const checkCartOwner = (req, res, next) => {
  if (req.user.cart_id === req.params.cart_id) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "Not Authorized to View or Edit the Content!" });
  }
};

// Check if the user accessing the order details is the owner of the order
const db = require("../db/index");
const { checkOrderOwnerById } = require("../db/ordersQuery");

const checkOrderOwner = async (req, res, next) => {
  const order_id = req.params.order_id;
  const user_id = req.user.user_id;

  try {
    const owner = await db.query(checkOrderOwnerById, [order_id, user_id]);
    if (!owner.rows.length) {
      res
        .status(401)
        .json({ message: "Not Authorized to View or Edit the Content!" });
    } else {
      next();
    }
  } catch (err) {
    // If UUID is invalid postgres will throw the 'INVALID TEXT REPRESENTATION' error
    // Make the error more specific to UUID by accessing err.routine == "string_to_uuid"
    if (err.code == "22P02" && err.routine == "string_to_uuid") {
      res
        .status(401)
        .json({ message: "Not Authorized to View or Edit the Content!" });
    } else {
      next(err);
    }
  }
};

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  checkAdmin,
  checkOwnerOrAdmin,
  checkCartOwner,
  checkOrderOwner,
};
