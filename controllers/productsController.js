const db = require("../db/index");

// Queries
const {
  insertProduct,
  selectProducts,
  selectProductById,
  updateProductById,
  deleteProductById,
} = require("../db/productsQuery");

// Error handlers
const { invalidIdError } = require("../helpers/errorHandlers");

// Create new product
const createProduct = async (req, res, next) => {
  const { name, description, quantity, price, img_urls, specs } = req.body;

  try {
    await db.query(insertProduct, [
      name,
      description,
      quantity,
      price,
      img_urls,
      specs,
    ]);

    res.status(201).json({ message: "Product Created Successfully" });
  } catch (err) {
    next(err);
  }
};

// Get all products
const getProducts = async (req, res, next) => {
  try {
    const products = await db.query(selectProducts);
    res.status(200).json(products.rows);
  } catch (err) {
    next(err);
  }
};

// Get one product
const getProduct = async (req, res, next) => {
  const product_id = req.params.product_id;

  try {
    const product = await db.query(selectProductById, [product_id]);
    if (!product.rows.length) {
      invalidIdError(next);
    } else {
      res.status(200).json(product.rows[0]);
    }
  } catch (err) {
    // If UUID is invalid postgres will throw the 'INVALID TEXT REPRESENTATION' error
    // Make the error more specific to UUID by accessing err.routine == "string_to_uuid"
    if (err.code == "22P02" && err.routine == "string_to_uuid") {
      invalidIdError(next);
    } else {
      next(err);
    }
  }
};

// Update product
const updateProduct = async (req, res, next) => {
  const product_id = req.params.product_id;
  const { name, description, quantity, price, img_urls, specs } = req.body;

  try {
    // Check if product with the given id exists
    const product = await db.query(selectProductById, [product_id]);
    if (!product.rows.length) {
      invalidIdError(next);
    } else {
      await db.query(updateProductById, [
        name,
        description,
        quantity,
        price,
        img_urls,
        specs,
        product_id,
      ]);
      res.status(200).json({ message: "Product Updated Successfully" });
    }
  } catch (err) {
    // If UUID is invalid postgres will throw the 'INVALID TEXT REPRESENTATION' error
    // Make the error more specific to UUID by accessing err.routine == "string_to_uuid"
    if (err.code == "22P02" && err.routine == "string_to_uuid") {
      invalidIdError(next);
    } else {
      next(err);
    }
  }
};

// Delete product
const deleteProduct = async (req, res, next) => {
  const product_id = req.params.product_id;

  try {
    // Check if product with the given id exists
    const product = await db.query(selectProductById, [product_id]);
    if (!product.rows.length) {
      invalidIdError(next);
    } else {
      await db.query(deleteProductById, [product_id]);
      res.status(200).json({ message: "Product Deleted Successfully" });
    }
  } catch (err) {
    // If UUID is invalid postgres will throw the 'INVALID TEXT REPRESENTATION' error
    // Make the error more specific to UUID by accessing err.routine == "string_to_uuid"
    if (err.code == "22P02" && err.routine == "string_to_uuid") {
      invalidIdError(next);
    } else {
      next(err);
    }
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
