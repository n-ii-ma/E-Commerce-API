const insertProductIntoOrder =
  "INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3)";

// Delete all the products in user's order history when that user is being deleted
const deleteAllOrderProducts =
  "DELETE FROM orders_products USING orders WHERE orders.order_id = orders_products.order_id AND orders.user_id = $1";

module.exports = { insertProductIntoOrder, deleteAllOrderProducts };
