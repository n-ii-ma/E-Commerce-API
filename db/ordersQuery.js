const insertOrder =
  "INSERT INTO orders (user_id, total_price, status) VALUES ($1, $2, $3) RETURNING *";

module.exports = { insertOrder };
