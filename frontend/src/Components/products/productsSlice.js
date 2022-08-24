import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  console.log('fetch products api is called');
  const response = await axios.get('http://localhost:5000/api/products');
  console.log(response);
  return response.data;
})



const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {

  },
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = 'success';
      state.products = action.payload;
      console.log('products are set to redux');
    },
    [fetchProducts.rejected]: (state, action) => {
      return {
        products: [],
        status: 'failed',
        error: action.error.message,
      }
    }
  }
});

export default productSlice.reducer;
