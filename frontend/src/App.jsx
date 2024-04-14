import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import NotFound from "./Components/Not Found/NotFound";
import ProtectedRoute from "./Components/Protected Routes/ProtectedRoute";
import About from "./Pages/About";
import Account from "./Pages/Account";
import Coupon from "./Pages/Admin/Apps/Coupon";
import Stopwatch from "./Pages/Admin/Apps/StopWatch";
import Toss from "./Pages/Admin/Apps/Toss";
import Customers from "./Pages/Admin/Customers";
import Dashboard from "./Pages/Admin/Dashboard";
import NewProduct from "./Pages/Admin/Management/NewProduct";
import ProductManagement from "./Pages/Admin/Management/ProductManagement";
import Products from "./Pages/Admin/Products";
import Transactions from "./Pages/Admin/Transactions";
import Cart from "./Pages/Cart";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";
import LoginSignup from "./Pages/LoginSignup";
import Orders from "./Pages/Orders";
import Product from "./Pages/Product";
import Shipping from "./Pages/Shipping";
import { userExist } from "./Redux/Reducer/UserReducer";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import Search from "./Pages/Search";
import TransactionManagement from "./Pages/Admin/Management/TransactionManagement";
import Checkout from "./Pages/Checkout";

function App() {
  const { user, loading } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        let userDataFromCookie = Cookies.get("userData");

        if (userDataFromCookie) {
          const cookies = document.cookie.split("; ");
          let userDataString = null;

          for (let i = 0; i < cookies.length; i++) {
            if (cookies[i].startsWith("userData=")) {
              userDataString = cookies[i].substring("userData=".length);
              break;
            }
          }

          if (userDataString) {
            try {
              const parsedUserData = JSON.parse(
                decodeURIComponent(userDataString)
              );
              dispatch(userExist(parsedUserData));
            } catch (error) {
              console.error("Error parsing userData cookie:", error);
            }
          }
        } else {
          const response = await fetch(
            `${import.meta.env.VITE_SERVER}/api/v1/user/session`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const responseData = await response.json();
          dispatch(userExist(responseData.userData));
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();
  }, []);

  return loading ? (
    <h1>loading... </h1>
  ) : (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute isAuthenticated={user ? false : true}>
              <LoginSignup />
            </ProtectedRoute>
          }
        />
        <Route path="/pay" element={<Checkout />} />

        <Route
          element={<ProtectedRoute isAuthenticated={user ? true : false} />}
        >
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
        </Route>

        <Route
          element={
            <ProtectedRoute
              isAuthenticated={true}
              adminOnly={true}
              admin={user && user.role === "admin" ? true : false}
            />
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route
            path="/admin/transactions/:id"
            element={<TransactionManagement />}
          />
          <Route path="/admin/products/new" element={<NewProduct />} />
          <Route path="/admin/products/:id" element={<ProductManagement />} />

          <Route path="/admin/app/coupon" element={<Coupon />} />
          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
          <Route path="/admin/app/toss" element={<Toss />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
