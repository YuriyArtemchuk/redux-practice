import { createSlice, configureStore } from "@reduxjs/toolkit";
import cartProductsSlice from "./cart-products-slice";

const initialState = { isCartVisible: false, statusMessage: null };

const cartVisibilitySlice = createSlice({
  name: "cart-visibility",
  initialState: initialState,
  reducers: {
    setCartVisibility(state) {
      state.isCartVisible = !state.isCartVisible;
    },
    showStatusMessage(state, action) {
      state.statusMessage = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

const store = configureStore({
  reducer: {
    cartVisibility: cartVisibilitySlice.reducer,
    cartProducts: cartProductsSlice.reducer,
  },
  devTools: true,
});

export const cartVisibilityActions = cartVisibilitySlice.actions;
export default store;
