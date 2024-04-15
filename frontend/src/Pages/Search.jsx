import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../Redux/api/productApi";
import ProductCard from "../Components/Product Card/ProductCard";
import "./CSS/Search.css";
import { addToCart } from "../Redux/Reducer/CartReducer";
import { RiMenu3Fill } from "react-icons/ri";
import Skeleton from "../Components/Skeleton/Skeleton";

const Search = () => {
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const { data: categoriesResponse, isLoading: loadingCategories } =
    useCategoriesQuery("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(500000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const { isLoading: productLoading, data: searchData } =
    useSearchProductsQuery({
      search,
      sort,
      category,
      page,
      price: maxPrice,
    });

  const dispatch = useDispatch();

  const addToCartHandler = (cartItem) => {
    if (cartItem.stock < 1) return toast.error("Out of stock");

    dispatch(addToCart(cartItem));
    toast.success("Added to cart");
  };

  const isPrevPage = page > 1;
  const isNextPage = page < searchData?.totalPage;

  return (
    <div className="product-search-page">
      <div className="hamburger-filter" onClick={dropdown_toggle}>
        <RiMenu3Fill />
      </div>
      <aside ref={menuRef}>
        <h2 className="heading">Filters</h2>
        <div className="sort-filter">
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={500000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!loadingCategories &&
              categoriesResponse?.categories.map((i) => (
                <option value={i} key={i.toUpperCase()}>
                  {i}
                </option>
              ))}
          </select>
        </div>
      </aside>

      <main>
        <h1 className="heading">Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {productLoading ? (
          <Skeleton length={15} />
        ) : (
          <div className="search-product-list">
            {searchData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
                oldPrice={i.oldPrice}
                rating={i.rating}
              />
            ))}
          </div>
        )}

        {searchData && searchData.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {searchData.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
