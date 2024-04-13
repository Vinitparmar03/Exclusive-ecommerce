import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getCheapProducts,
  getLatestProducts,
  getRelatedProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.js";

const app = express.Router();

app.post("/new", adminOnly, singleUpload, newProduct);
app.get("/all", getAllProducts);
app.get("/latest", getLatestProducts);
app.get("/categories", getAllCategories);
app.get("/cheap-products", getCheapProducts);
app.get("/admin-products", getAdminProducts);
app.get("/related-products", getRelatedProducts);
app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;