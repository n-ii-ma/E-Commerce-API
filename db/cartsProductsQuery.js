const insertProductIntoCart =
  "INSERT INTO carts_products (cart_id, product_id, quantity) VALUES ($1, $2, $3)";

const selectCartProducts =
  "SELECT products.product_id, products.name, products.price, products.img_urls, carts_products.quantity FROM carts JOIN carts_products ON carts_products.cart_id = carts.cart_id JOIN products ON products.product_id = carts_products.product_id WHERE user_id = $1";

const deleteAllCartProducts =
  "DELETE FROM carts_products USING carts WHERE carts.cart_id = carts_products.cart_id AND carts.user_id = $1";

module.exports = {
  insertProductIntoCart,
  selectCartProducts,
  deleteAllCartProducts,
};
