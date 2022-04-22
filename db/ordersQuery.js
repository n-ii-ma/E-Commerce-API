const insertOrder =
  "INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING *";

const selectOrders =
  "SELECT orders.order_id, orders.order_number, orders.user_id, users.email, users.address, users.city, users.postal_code, users.phone, orders.total_price, orders.status, orders.created_at FROM orders JOIN users ON users.user_id = orders.user_id ORDER BY orders.order_number DESC";

const selectOrdersByUserId =
  "SELECT order_number, order_id, total_price, status, created_at FROM orders WHERE user_id = $1 ORDER BY order_number DESC";

// Check if the user accessing its order details is the owner of the order
const checkOrderOwnerById =
  "SELECT * FROM orders WHERE order_id = $1 AND user_id = $2";

const selectOrdersByOrderId = "SELECT * FROM orders WHERE order_id = $1";

const deleteOrderByUserId = "DELETE FROM orders WHERE user_id = $1";

module.exports = {
  insertOrder,
  selectOrders,
  selectOrdersByUserId,
  checkOrderOwnerById,
  selectOrdersByOrderId,
  deleteOrderByUserId,
};
