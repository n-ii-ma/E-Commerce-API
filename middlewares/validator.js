const { body, validationResult } = require("express-validator");

// Validation error handling
const customValidationError = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Stringify and parse the error and access the first and most specific error message
    const parsedError = JSON.parse(JSON.stringify(errors.array()))[0].msg;

    const error = new Error(parsedError);
    error.status = 400;
    next(error);
  } else {
    next();
  }
};

// Validate user registeration
const validateRegisteration = [
  body("first_name")
    .exists({ checkFalsy: true })
    .withMessage("First Name Cannot Be Empty!")
    .bail()
    .isLength({ max: 32 })
    .withMessage("First Name Must Be Less than 32 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("last_name")
    .exists({ checkFalsy: true })
    .withMessage("Last Name Cannot Be Empty!")
    .bail()
    .isLength({ max: 32 })
    .withMessage("Last Name Must Be Less than 32 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email Cannot Be Empty!")
    .bail()
    .isEmail()
    .withMessage("Email Must Be a Valid Email!")
    .bail()
    .isLength({ min: 5, max: 64 })
    .withMessage("Email Must Be Between 5 to 64 Characters Long!")
    .bail()
    .normalizeEmail()
    .trim()
    .escape(),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password Cannot Be Empty!")
    .bail()
    .isLength({ min: 8, max: 255 })
    .withMessage("Password Must Be Between 8 to 255 Characters Long!")
    .bail()
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,255}$/)
    .withMessage(
      "Password Must Contain at least One Number, One Lowercase, and One Uppercase Character!"
    )
    .bail()
    .trim()
    .escape(),
  customValidationError,
];

// Validate user login
const validateLogin = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Email Cannot Be Empty!")
    .bail()
    .normalizeEmail()
    .trim()
    .escape(),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Password Cannot Be Empty!")
    .bail()
    .trim()
    .escape(),
  customValidationError,
];

// Validate user's private info update
const validateCredentialsUpdate = [
  body("first_name")
    .optional({ nullable: true })
    .isLength({ max: 32 })
    .withMessage("First Name Must Be Less than 32 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("last_name")
    .optional({ nullable: true })
    .isLength({ max: 32 })
    .withMessage("Last Name Must Be Less than 32 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("email")
    .optional({ nullable: true })
    .isEmail()
    .withMessage("Email Must Be a Valid Email!")
    .bail()
    .isLength({ min: 5, max: 64 })
    .withMessage("Email Must Be Between 5 to 64 Characters Long!")
    .bail()
    .normalizeEmail()
    .trim()
    .escape(),
  body("password")
    .optional({ nullable: true })
    .isLength({ min: 8, max: 255 })
    .withMessage("Password Must Be Between 8 to 255 Characters Long!")
    .bail()
    .matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,255}$/)
    .withMessage(
      "Password Must Contain at least One Number, One Lowercase, and One Uppercase Character!"
    )
    .bail()
    .trim()
    .escape(),
  customValidationError,
];

// Validate user's address info update
const validateAddressUpdate = [
  body("address")
    .optional({ nullable: true })
    .isLength({ min: 5, max: 255 })
    .withMessage("Address Must Be Between 5 to 255 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("city")
    .optional({ nullable: true })
    .isLength({ max: 32 })
    .withMessage("City Name Must Be Less than 32 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("postal_code")
    .optional({ nullable: true })
    .isLength({ min: 10, max: 10 })
    .withMessage("Postal Code Must Be 10 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("phone")
    .optional({ nullable: true })
    .isLength({ min: 10, max: 20 })
    .withMessage("Phone Number Must Be Between 10 to 20 Characters Long!")
    .bail()
    .trim()
    .escape(),
  customValidationError,
];

// Validate product creation
const validateProductCreation = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Product Name Cannot Be Empty!")
    .bail()
    .isLength({ max: 64 })
    .withMessage("Product Name Must Be Less than 64 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("Product Description Cannot Be Empty!")
    .bail()
    .trim(),
  body("quantity")
    .optional({ nullable: true })
    .isNumeric()
    .withMessage("Quantity Must Be a Number!")
    .bail()
    .trim()
    .escape(),
  body("price")
    .exists({ checkFalsy: true })
    .withMessage("Price Cannot Be Empty!")
    .bail()
    .isNumeric()
    .withMessage("Price Must Be a Number!")
    .bail()
    .trim()
    .escape(),
  body("img_urls").optional({ nullable: true }),
  body("specs").optional({ nullable: true }),
  customValidationError,
];

// Validate product update
const validateProductUpdate = [
  body("name")
    .optional({ nullable: true })
    .isLength({ max: 64 })
    .withMessage("Product Name Must Be Less than 64 Characters Long!")
    .bail()
    .trim()
    .escape(),
  body("description").optional({ nullable: true }).trim(),
  body("quantity")
    .optional({ nullable: true })
    .isNumeric()
    .withMessage("Quantity Must Be a Number!")
    .bail()
    .trim()
    .escape(),
  body("price")
    .optional({ nullable: true })
    .isNumeric()
    .withMessage("Price Must Be a Number!")
    .bail()
    .trim()
    .escape(),
  body("img_urls").optional({ nullable: true }),
  body("specs").optional({ nullable: true }),
  customValidationError,
];

// Validate products being added to cart
const validateAddCartProducts = [
  body("product_id")
    .exists({ checkFalsy: true })
    .withMessage("Product ID Cannot Be Empty!")
    .bail()
    .trim()
    .escape(),
  body("quantity")
    .exists({ checkFalsy: true })
    .withMessage("Product Quantity Cannot Be Empty!")
    .bail()
    .isNumeric()
    .withMessage("Quantity Must Be a Number!")
    .bail()
    .trim()
    .escape(),
  body("color")
    .exists({ checkFalsy: true })
    .withMessage("Color Cannot Be Empty!")
    .bail()
    .isLength({ max: 32 })
    .withMessage("Color Must Be Less than 32 Characters Long!")
    .bail()
    .trim()
    .escape(),
  customValidationError,
];

// Validate products quantity update in cart
const validateUpdCartProducts = [
  body("product_id")
    .exists({ checkFalsy: true })
    .withMessage("Product ID Cannot Be Empty!")
    .bail()
    .trim()
    .escape(),
  body("quantity")
    .exists({ checkFalsy: true })
    .withMessage("Product Quantity Cannot Be Empty!")
    .bail()
    .isNumeric()
    .withMessage("Quantity Must Be a Number!")
    .bail()
    .trim()
    .escape(),
  customValidationError,
];

module.exports = {
  validateRegisteration,
  validateLogin,
  validateCredentialsUpdate,
  validateAddressUpdate,
  validateProductCreation,
  validateProductUpdate,
  validateAddCartProducts,
  validateUpdCartProducts,
};
