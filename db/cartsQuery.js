const insertCart = "INSERT INTO carts (user_id) VALUES ($1)";

const selectCarts =
  "SELECT carts.cart_id, users.user_id, users.email FROM carts JOIN users ON carts.user_id = users.user_id";

const selectCartByUserId = "SELECT * FROM carts WHERE user_id = $1";

const insertProductIntoCart =
  "INSERT INTO carts_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)";

const selectCartProducts =
  "SELECT products.product_id, products.name, products.price, products.img_urls, carts_products.quantity FROM carts JOIN carts_products ON carts_products.cart_id = carts.cart_id JOIN products ON products.product_id = carts_products.product_id WHERE user_id = $1";

const deleteCartByUserId = "DELETE FROM carts WHERE user_id = $1";

module.exports = {
  insertCart,
  selectCarts,
  selectCartByUserId,
  insertProductIntoCart,
  selectCartProducts,
  deleteCartByUserId,
};
