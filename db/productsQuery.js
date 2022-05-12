const insertProduct =
  "INSERT INTO products (name, description, quantity, price, img_urls, specs) VALUES ($1, $2, $3, $4, $5, $6)";

const selectProducts = "SELECT * FROM products ORDER BY price DESC";

const selectProductById = "SELECT * FROM products WHERE product_id = $1";

const updateProductById =
  // Since COALESCE (expression, replacement) returns the first non-null value, it'll skip the null value and returns the same value as before
  "UPDATE products SET name = COALESCE ($1, name), description = COALESCE ($2, description), quantity = COALESCE ($3, quantity), price = COALESCE ($4, price), img_urls = COALESCE ($5, img_urls), specs = COALESCE ($6, specs) WHERE product_id = $7";

const deleteProductById = "DELETE FROM products WHERE product_id = $1";

module.exports = {
  insertProduct,
  selectProducts,
  selectProductById,
  updateProductById,
  deleteProductById,
};
