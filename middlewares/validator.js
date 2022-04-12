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

module.exports = { validateRegisteration };
