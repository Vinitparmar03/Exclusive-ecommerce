import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
};

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading cart state from localStorage:", err);
    return initialState;
  }
};

// Save cart state to localStorage
const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.error("Error saving cart state to localStorage:", err);
  }
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState: loadCartState(),
  reducers: {
    addToCart: (state, action) => {
      state.loading = true;

      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) {
        state.cartItems[index] = action.payload;
      } else {
        state.cartItems.push(action.payload);
      }
      state.loading = false;
      saveCartState(state);
    },

    removeCartItem: (state, action) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
      saveCartState(state);
    },

    calculatePrice: (state) => {
      let subtotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      state.subtotal = subtotal;
      state.shippingCharges = state.subtotal > 2000 ? 0 : 200;
      state.tax = Math.round(state.subtotal * 0.18);
      state.total =
        state.subtotal + state.shippingCharges + state.tax - state.discount;
      saveCartState(state);
    },

    discountApplied: (state, action) => {
      state.discount = action.payload;
      saveCartState(state);
    },

    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
      saveCartState(state);
    },
    resetCart: (state) => {
      const { shippingInfo, ...cartState } = initialState;
      const newState = {
        ...state,
        ...cartState,
      };
      saveCartState(newState);
      return newState;
    },
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  discountApplied,
  saveShippingInfo,
  resetCart,
} = cartReducer.actions;
