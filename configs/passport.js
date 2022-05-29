const LocalStrategy = require("passport-local").Strategy;
const db = require("../db/index");
const bcrypt = require("bcrypt");

// Queries
const { findUserByEmail, findUserById } = require("../db/authQuery");
const { selectCartByUserId } = require("../db/cartsQuery");

// Passport initialization
const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      // Checking if user with the given email exists
      const findUser = await db.query(findUserByEmail, [email]);
      const user = findUser.rows[0];

      if (!user) {
        return done(null, false, { message: "User Not Found!" });
      }

      // Compare provided password with the hashed password in db
      const matched = await bcrypt.compare(password, user.password);

      if (!matched) {
        return done(null, false, { message: "Password Incorrect!" });
      } else {
        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  // Store user id in session
  passport.serializeUser(async (user, done) => {
    // Add the cart_id property to req.user on login
    const cart = await db.query(selectCartByUserId, [user.user_id]);
    const cart_id = cart.rows[0].cart_id;
    user.cart_id = cart_id;

    done(null, user.user_id);
  });

  // Fetch user data from session
  passport.deserializeUser(async (id, done) => {
    try {
      // Fetching user data of the stored id from session
      const findUser = await db.query(findUserById, [id]);
      const user = findUser.rows[0];

      // If the already logged in user gets deleted by the admin, it won't exist in the db
      // So deserialize it out of the session to handle the "failed to deserialize user out of session" error
      if (!user) {
        return done(null, false);
      } else {
        // Add the cart_id property to req.user
        const cart = await db.query(selectCartByUserId, [user.user_id]);
        const cart_id = cart.rows[0].cart_id;
        user.cart_id = cart_id;

        return done(null, user);
      }
    } catch (err) {
      return done(err);
    }
  });
};

module.exports = initialize;
