import Cookies from "js-cookie";
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Loader from "./Components/Loader/Loader";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoute from "./Components/Protected Routes/ProtectedRoute";
import { userExist } from "./Redux/Reducer/UserReducer";

const Home = lazy(() => import("./Pages/Home"));
const Contact = lazy(() => import("./Pages/Contact"));
const About = lazy(() => import("./Pages/About"));
const LoginSignup = lazy(() => import("./Pages/LoginSignup"));
const NotFound = lazy(() => import("./Components/Not Found/NotFound"));
const Account = lazy(() => import("./Pages/Account"));
const Coupon = lazy(() => import("./Pages/Admin/Apps/Coupon"));
const Stopwatch = lazy(() => import("./Pages/Admin/Apps/StopWatch"));
const Toss = lazy(() => import("./Pages/Admin/Apps/Toss"));
const Customers = lazy(() => import("./Pages/Admin/Customers"));
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard"));
const NewProduct = lazy(() => import("./Pages/Admin/Management/NewProduct"));
const ProductManagement = lazy(() =>
  import("./Pages/Admin/Management/ProductManagement")
);
const Products = lazy(() => import("./Pages/Admin/Products"));
const Transactions = lazy(() => import("./Pages/Admin/Transactions"));
const Cart = lazy(() => import("./Pages/Cart"));
const TransactionManagement = lazy(() =>
  import("./Pages/Admin/Management/TransactionManagement")
);
const Checkout = lazy(() => import("./Pages/Checkout"));
const Orders = lazy(() => import("./Pages/Orders"));
const Product = lazy(() => import("./Pages/Product"));
const Search = lazy(() => import("./Pages/Search"));
const Shipping = lazy(() => import("./Pages/Shipping"));

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
    <Loader />
  ) : (
    <BrowserRouter>
      <Navbar />

      <Suspense fallback={<Loader />}>
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
      </Suspense>

      <Footer />
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
