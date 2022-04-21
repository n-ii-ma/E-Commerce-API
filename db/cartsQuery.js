const insertCart = "INSERT INTO carts (user_id) VALUES ($1)";

const selectCarts =
  "SELECT carts.cart_id, users.user_id, users.email FROM carts JOIN users ON carts.user_id = users.user_id";

const selectCartByUserId = "SELECT * FROM carts WHERE user_id = $1";

const deleteCartByUserId = "DELETE FROM carts WHERE user_id = $1";

module.exports = {
  insertCart,
  selectCarts,
  selectCartByUserId,
  deleteCartByUserId,
};
