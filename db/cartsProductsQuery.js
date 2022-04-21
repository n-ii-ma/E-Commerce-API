const insertProductIntoCart =
  "INSERT INTO carts_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)";

const selectCartProducts =
  "SELECT products.product_id, products.name, products.price, products.img_urls, carts_products.quantity FROM carts JOIN carts_products ON carts_products.cart_id = carts.cart_id JOIN products ON products.product_id = carts_products.product_id WHERE user_id = $1";

const selectProductFromCart =
  "SELECT * FROM carts_products WHERE cart_id = $1 AND product_id = $2";

const updateCartProductsById =
  "UPDATE carts_products SET quantity = $1 WHERE cart_id = $2 AND product_id = $3";

const deleteAllCartProducts =
  "DELETE FROM carts_products USING carts WHERE carts.cart_id = carts_products.cart_id AND carts.user_id = $1";

module.exports = {
  insertProductIntoCart,
  selectCartProducts,
  selectProductFromCart,
  updateCartProductsById,
  deleteAllCartProducts,
};
