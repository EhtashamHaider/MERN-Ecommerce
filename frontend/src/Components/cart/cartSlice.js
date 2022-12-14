import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
  totalItems: 0,
  cart: [],
};

export const updateCart = createAsyncThunk('updateCart', async (token) => {
  const response = await axios.get('http://localhost:3001/api/cart', {
    headers: {
      'x-auth-token': token,
    }
  });
  console.log(response);
  return response.data;
})

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    itemAdded: (state) => {
      state.totalItems += 1;
    },
    itemRemoved: (state, action) => {
      // const item = state.find(prod => prod.id == action.payload.id);
      // const index = state.indexOf(item);
      // state.splice(index, 1);
      state.totalItems -=1;
    }
  },
  extraReducers: {
    [updateCart.pending]: (state, action) => {
      console.log('In pending state');
    },
    [updateCart.fulfilled]: (state, { payload }) => {
      console.log('into the updateCart.fulfilled');
      let totalItems = 0;
      payload.map(item => {
        totalItems += item.quantity;
      })
      console.log('payload', payload);
      return {
        totalItems: totalItems,
        cart: [...payload],
      };
    }

  },

})

export const { itemAdded, itemRemoved } = cartSlice.actions;
export default cartSlice.reducer;