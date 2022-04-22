const insertOrder =
  "INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING *";

const deleteOrderByUserId = "DELETE FROM orders WHERE user_id = $1";

module.exports = { insertOrder, deleteOrderByUserId };
