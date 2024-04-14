import React, { useState } from "react";
import "../CSS/ProductManagement.css";
import AdminSideBar from "../../../Components/Admin/Admin Side Bar/AdminSideBar";
import { useNewProductMutation } from "../../../Redux/api/productApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const NewProduct = () => {
  const { user } = useSelector((state) => state.userReducer);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [Stock, setStock] = useState(0);
  const [category, setCategory] = useState("mens-fashion");
  const [photo, setPhoto] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);
  const [photoPrev, setPhotoPrev] = useState("");

  const [newproduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e) => {
    const file = e.target.files?.[0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !price || Stock < 0 || !category || !photo) return;

    const formData = new FormData();

    formData.set("name", name);
    formData.set("description", description.toString());
    formData.set("oldPrice", oldPrice.toString());
    formData.set("rating", rating.toString());
    formData.set("price", price.toString());
    formData.set("stock", Stock.toString());
    formData.set("photo", photo);
    formData.set("category", category);

    const res = await newproduct({ id: user?.id, formData });

    if (res) {
      toast.success("Product Added Successfully");
      navigate("/admin/products");
    }
  };
  return (
    <div className="admin-container">
      <AdminSideBar />
      <main className="product-management">
        <article className="product-managment-form">
          <form onSubmit={(e) => submitHandler(e)}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(String(e.target.value))}
              />
            </div>
            <div>
              <label>Old Price</label>
              <input
                required
                type="number"
                placeholder="Old Price"
                value={oldPrice}
                onChange={(e) => setOldPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div className="categories">
              <label>Categories</label>
              <select
                name="categories"
                id="categories"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
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
                required
                type="number"
                placeholder="Stock"
                value={Stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                required
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Rating</label>
              <input
                required
                type="number"
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Photo</label>
              <input
                required
                type="file"
                onChange={(e) => changeImageHandler(e)}
              />
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
