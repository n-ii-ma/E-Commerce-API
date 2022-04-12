const db = require("../db/index");
const bcrypt = require("bcrypt");
const passport = require("passport");

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

    await db.query(createUser, [first_name, last_name, email, hashedPassword]);

    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    // If UNIQUE constraint is violated
    if (err.code == "23505") {
      uniqueViolationError(next);
    } else {
      next(err);
    }
  }
};

// Login
const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    // If no user is found
    if (!user) {
      return res.status(401).json(info);
    }

    // If user is found
    req.login(user, (err) => {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({
          message: "Login Successful",
          user: {
            user_id: req.user.user_id,
            email: req.user.email,
          },
        });
      }
    });
  })(req, res, next);
};

// Logout
const logout = (req, res, next) => {
  req.logout();
  // Delete session and clear cookie
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.clearCookie("pg.sessionId");
      res.status(200).json({ message: "Logout Successful" });
    }
  });
};

module.exports = { register, login, logout };
