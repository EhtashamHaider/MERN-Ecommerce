import { configureStore } from "@reduxjs/toolkit";
import productsReducer from '../Components/products/productsSlice';
import cartReducer from '../Components/cart/cartSlice';
import userReducer from '../Components/userData/userSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user:userReducer,
  }
})
