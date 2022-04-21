const insertProductIntoOrder =
  "INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3)";

module.exports = { insertProductIntoOrder };
