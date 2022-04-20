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

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated,
  checkAdmin,
  checkOwnerOrAdmin,
  checkCartOwner,
};
