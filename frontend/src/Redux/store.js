import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./Reducer/UserReducer";
import { userAPI } from "./api/userApi";
import { dashboardApi } from "./api/dashboardAPI";
import { productAPI } from "./api/productApi";
import { orderApi } from "./api/orderApi";
import { cartReducer } from "./Reducer/CartReducer";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({
  reducer: {
    [userReducer.name]: userReducer.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [cartReducer.name]: cartReducer.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      userAPI.middleware,
      dashboardApi.middleware,
      productAPI.middleware,
      orderApi.middleware
    );
  },
});
