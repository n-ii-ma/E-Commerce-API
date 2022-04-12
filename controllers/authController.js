const db = require("../db/index");
const bcrypt = require("bcrypt");

// Queries
const { createUser } = require("../db/authQuery");

// Error handlers
const { uniqueViolationError } = require("../helpers/errorHandlers");

// Register new user
const register = async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // Hash the input password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.query(createUser, [
      first_name,
      last_name,
      email,
      hashedPassword,
    ]);

    res
      .status(201)
      .json({ message: "User Created Successfully", user: newUser.rows[1] });
  } catch (err) {
    // If UNIQUE constraint is violated
    if (err.code == "23505") {
      uniqueViolationError(next);
    } else {
      next(err);
    }
  }
};

module.exports = { register };
