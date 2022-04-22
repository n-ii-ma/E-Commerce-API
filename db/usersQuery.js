const selectUsers = "SELECT * FROM users";

const selectUserById = "SELECT * FROM users WHERE user_id = $1";

// Since COALESCE (expression, replacement) returns the first non-null value, it'll skip the null value and returns the same value as before
const updateUserCredentialsById =
  "UPDATE users SET first_name = COALESCE ($1, first_name), last_name = COALESCE ($2, last_name), email = COALESCE ($3, email), password = COALESCE ($4, password) WHERE user_id = $5";

const updateUserAddressById =
  "UPDATE users SET address = COALESCE ($1, address), city = COALESCE ($2, city), postal_code = COALESCE ($3, postal_code), phone = COALESCE ($4, phone) WHERE user_id = $5";

const deleteUserById = "DELETE FROM users WHERE user_id = $1";

// Check if shipping address has been provided in the user info
const checkAddress =
  "SELECT * FROM users WHERE address IS NOT NULL AND city IS NOT NULL AND postal_code IS NOT NULL AND phone IS NOT NULL AND user_id = $1";

module.exports = {
  selectUsers,
  selectUserById,
  updateUserCredentialsById,
  updateUserAddressById,
  deleteUserById,
  checkAddress,
};
