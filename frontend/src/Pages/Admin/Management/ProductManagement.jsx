import React, { useEffect, useState } from "react";
import AdminSideBar from "../../../Components/Admin/Admin Side Bar/AdminSideBar";
import "../CSS/Dashboard.css";
import "../CSS/ProductManagement.css";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../Redux/api/productApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProductManagement = () => {
  const { user } = useSelector((state) => state.userReducer);

  const params = useParams();
  const navigate = useNavigate();

  const { data } = useProductDetailsQuery(params.id);

  const { price, photo, name, stock, category, oldPrice, rating, description } =
    data?.product || {
      _id: "",
      photo: "",
      category: "",
      name: "",
      stock: 0,
      price: 0,
      oldPrice: 0,
      rating: 0,
      description: "",
    };

  const [nameUpdate, setNameUpdate] = useState(name);
  const [priceUpdate, setPriceUpdate] = useState(price);
  const [stockUpdate, setStockUpdate] = useState(stock);
  const [photoUpdate, setPhotoUpdate] = useState("");
  const [oldPriceUpdate, setOldPriceUpdate] = useState(oldPrice);
  const [descriptionUpdate, setDescriptionUpdate] = useState(description);
  const [ratingUpdate, setRatingUpdate] = useState(rating);
  const [categoryUpdate, setCategoryUpdate] = useState(category);
  const [photoFile, setPhotoFile] = useState();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") setPhotoUpdate(reader.result);
        setPhotoFile(file);
      };
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);
    if (oldPriceUpdate) formData.set("oldPrice", oldPriceUpdate.toString());
    if (descriptionUpdate)
      formData.set("description", descriptionUpdate.toString());
    if (ratingUpdate) formData.set("rating", ratingUpdate.toString());

    const res = await updateProduct({
      formData,
      userId: user?.id,
      productId: data?.product._id,
    });

    if (res) {
      toast.success(res.data.message);
      navigate("/admin/products");
    }
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?.id,
      productId: data?.product._id,
    });

    if (res) {
      toast.success(res.data.message);
      navigate("/admin/products");
    }
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
      setOldPriceUpdate(data.product.oldPrice);
      setDescriptionUpdate(data.product.description);
      setRatingUpdate(data.product.rating);
    }
  }, [data]);
  return (
    <div className="admin-container">
      <AdminSideBar />
      <main className="product-management">
        <section className="product-management-details">
          <strong>ID - asfdkjasljdfjlas</strong>
          <img src={`${photo}`} alt="Product" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red">Not Available</span>
          )}
          <h1>${price}</h1>
        </section>
        <article className="product-managment-form">
          <button className="product-delete-btn">
            <FaTrash onClick={deleteHandler} />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(String(e.target.value))}
              />
            </div>
            <div>
              <label>Old Price</label>
              <input
                type="number"
                placeholder="Old Price"
                value={oldPriceUpdate}
                onChange={(e) => setOldPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div className="categories">
              <label>Categories</label>
              <select
                name="categories"
                id="categories"
                onChange={(e) => setCategoryUpdate(e.target.value)}
                value={categoryUpdate}
              >
                <option value="mens-fashion">Mens Fashion</option>
                <option value="womens-fashion">Womens Fashion</option>
                <option value="kids-fashion">Kids Fashion</option>
                <option value="watches">Watches</option>
                <option value="electronics">Electronics</option>
                <option value="home-and-styles">Home & styles</option>
              </select>
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                placeholder="Description"
                value={descriptionUpdate}
                onChange={(e) => setDescriptionUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Rating</label>
              <input
                type="number"
                placeholder="Rating"
                value={ratingUpdate}
                onChange={(e) => setRatingUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Photo</label>
              <input type="file" onChange={(e) => changeImageHandler(e)} />
            </div>

            {photoUpdate && <img src={photoUpdate} alt="New Image" />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default ProductManagement;
