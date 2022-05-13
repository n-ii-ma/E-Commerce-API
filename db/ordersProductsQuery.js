const insertProductIntoOrder =
  "INSERT INTO orders_products (order_id, product_id, quantity, color) VALUES ($1, $2, $3, $4)";

const selectOrderProductsByOrderId =
  "SELECT products.product_id, products.name, orders_products.quantity, orders_products.color, products.price, products.img_urls FROM products JOIN orders_products ON orders_products.product_id = products.product_id WHERE order_id = $1";

// Delete all the products in user's order history when that user is being deleted
const deleteAllOrderProducts =
  "DELETE FROM orders_products USING orders WHERE orders.order_id = orders_products.order_id AND orders.user_id = $1";

module.exports = {
  insertProductIntoOrder,
  selectOrderProductsByOrderId,
  deleteAllOrderProducts,
};
