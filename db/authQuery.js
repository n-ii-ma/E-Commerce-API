const createUser =
  "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";

module.exports = { createUser };
