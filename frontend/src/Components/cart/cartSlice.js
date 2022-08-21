import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    itemAdded: (state, action) => {
      state.push(action.payload);
    },
    itemRemoved: (state, action) => {
      const item = state.find(prod => prod.id == action.payload.id);
      const index = state.indexOf(item);
      state.splice(index, 1);
    }
  },

})

export const { itemAdded, itemRemoved } = cartSlice.actions;
export default cartSlice.reducer;