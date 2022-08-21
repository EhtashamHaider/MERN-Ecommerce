import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../products/productsSlice';
import cartReducer from '../Components/cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  }
})
