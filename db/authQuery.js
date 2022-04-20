const createUser =
  "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";

const findUserByEmail = "SELECT * FROM users WHERE email = $1";

const findUserById = "SELECT * FROM users WHERE user_id = $1";

module.exports = { createUser, findUserByEmail, findUserById };
