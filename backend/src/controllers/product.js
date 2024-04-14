import { myCache } from "../../index.js";
import { Product } from "../models/product.js";
import { invalidatesCache } from "../utils/features.js";
import { rm } from "fs";
import { faker } from "@faker-js/faker";
import ErrorHandler from "../utils/utility-class.js";

export const getLatestProducts = async (req, res, next) => {
  let products = [];

  if (myCache.has("latest-product"))
    products = JSON.parse(myCache.get("latest-product"));
  else {
    products = await Product.find({}).sort({ createdAt: -1 }).limit(8);
    myCache.set("latest-product", JSON.stringify(products));
  }

  return res.status(201).json({
    success: true,
    products,
  });
};

export const getAllCategories = async (req, res, next) => {
  let categories;

  if (myCache.has("categories"))
    categories = JSON.parse(myCache.get("categories"));
  else {
    categories = await Product.distinct("category");
    myCache.set("categories", JSON.stringify(categories));
  }

  return res.status(201).json({
    success: true,
    categories,
  });
};

export const getAdminProducts = async (req, res, next) => {
  let products;

  if (myCache.has("all-products"))
    products = JSON.parse(myCache.get("all-products"));
  else {
    products = await Product.find({});
    myCache.set("all-products", JSON.stringify(products));
  }

  return res.status(201).json({
    success: true,
    products,
  });
};

export const getSingleProduct = async (req, res, next) => {
  let product;
  const id = req.params.id;

  if (myCache.has(`product-${id}`))
    product = JSON.parse(myCache.get(`product-${id}`));
  else {
    product = await Product.findById(req.params.id);

    if (!product) return next(new ErrorHandler("Product Not Found", 404));

    myCache.set(`product-${id}`, JSON.stringify(product));
  }

  return res.status(201).json({
    success: true,
    product,
  });
};

export const newProduct = async (req, res, next) => {
  try {
    const { name, rating, price, oldPrice, description, stock, category } =
      req.body;
      console.log(name)

    const photo = req.file;

    if (!photo) {
      throw new ErrorHandler("Please Add Photo", 400);
    }

    if (
      !name ||
      !rating ||
      !oldPrice ||
      !description ||
      !price ||
      !stock ||
      !category
    ) {
      throw new ErrorHandler("Please Enter All Fields", 400);
    }

    await Product.create({
      name,
      rating,
      price,
      oldPrice,
      description,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

    invalidatesCache({ product: true, admin: true });

    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    if (req.file) {
      rm(req.file.path, () => {
        console.log("Deleted");
      });
    }
    return next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, rating, price, oldPrice, description, stock, category } =
    req.body;
  const photo = req.file;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (photo) {
    rm(product.photo, () => {
      console.log("Old Photo Deleted");
    });
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;
  if (oldPrice) product.oldPrice = oldPrice;
  if (description) product.description = description;
  if (rating) product.rating = rating;

  await product.save();

  invalidatesCache({
    product: true,
    productId: String(product._id),
    admin: true,
  });

  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
};

export const deleteProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  rm(product.photo, () => {
    console.log("Product Photo Deleted");
  });

  await product.deleteOne();

  invalidatesCache({
    product: true,
    productId: String(product._id),
    admin: true,
  });

  return res.status(201).json({
    success: true,
    message: "Product Deleted Successfully",
  });
};

export const getAllProducts = async (req, res, next) => {
  const { search, sort, category, price } = req.query;

  const page = Number(req.query.page) || 1;

  const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
  const skip = (page - 1) * limit;

  const baseQuery = {};

  if (search)
    baseQuery.name = {
      $regex: search,
      $options: "i",
    };

  if (price)
    baseQuery.price = {
      $lte: Number(price),
    };

  if (category) baseQuery.category = category;

  const productPromise = Product.find(baseQuery)
    .sort(sort ? { price: sort === "asc" ? 1 : -1 } : undefined)
    .limit(limit)
    .skip(skip);

  const [products, filterOnlyProduct] = await Promise.all([
    productPromise,
    Product.find(baseQuery),
  ]);

  const totalPage = Math.ceil(filterOnlyProduct.length / limit);

  return res.status(201).json({
    success: true,
    products,
    totalPage,
  });
};

export const getCheapProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ price: 1 }).limit(4);

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getRelatedProducts = async (req, res) => {
  const { category, productId } = req.query;

  try {
    if (!productId) {
      return res.status(400).json({ error: "productId is required" });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: productId },
      category,
    })
      .sort({ price: 1 })
      .limit(4);

    res.status(200).json({ success: true, relatedProducts });
  } catch (err) {
    console.error("Error fetching related products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const generateRandomProducts = async (count = 10) => {
//   const products = [];

//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads\\2f56af53-f154-433b-b0d9-462abf76721b.png",
//       oldPrice: faker.commerce.price({ min: 50000, max: 80000, dec: 0 }),
//       price: faker.commerce.price({ min: 4000, max: 60000, dec: 0 }),
//       stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//       category: faker.commerce.department(),
//       description: faker.commerce.productDescription(),
//       rating: faker.commerce.price({ min: 1, max: 5, dec: 0 }),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };

//     products.push(product);
//   }

//   await Product.create(products);

//   console.log({ succecss: true });
// };

// generateRandomProducts(50);

// const deleteRandomsProducts = async (count = 10) => {
//   const products = await Product.find({}).skip(2);

//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }

//   console.log({ succecss: true });
// };

// deleteRandomsProducts(50);
