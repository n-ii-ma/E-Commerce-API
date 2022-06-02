const db = require("../db/index");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Queries
const { selectCartProducts } = require("../db/cartsProductsQuery");
const { checkAddress } = require("../db/usersQuery");

// Error handler
const { missingAddressError } = require("../helpers/errorHandlers");

const payment = async (req, res, next) => {
  const user_id = req.user.user_id;
  const email = req.user.email;

  try {
    // Check if cart isn't empty
    const cart = await db.query(selectCartProducts, [user_id]);
    if (!cart.rows.length) {
      res.status(200).json({ message: "Cart Is Empty" });
    } else {
      // Calculate the total price of the products based on their quantity
      const total_price = cart.rows
        .reduce((acc, item) => {
          return acc + parseFloat(item.price) * item.quantity;
        }, 0)
        .toFixed(2);

      // Check if shipping address has been provided in the user info
      const address = await db.query(checkAddress, [user_id]);
      if (!address.rows.length) {
        missingAddressError(next);
      } else {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: total_price,
          currency: "usd",
          receipt_email: email,
        });

        res.status(200).json({ client_secret: paymentIntent.client_secret });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = payment;
