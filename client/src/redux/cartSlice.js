import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart") ? JSON.parse((localStorage.getItem("cart"))).cartItems : [],
    total: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).total : 0,
    tax: 0.08,
  },
  reducers: {
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (findCartItem) {
        findCartItem.quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
      state.total += action.payload.price;
    },

    deleteProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity;
    },

    increase: (state, action) => {
        const cartItem = state.cartItems.find((item) => (item._id === action.payload._id))
        cartItem.quantity += 1
        state.total += cartItem.price  

    }, 
    decrease: (state, action) => {
      const cartItem = state.cartItems.find((item) => item._id === action.payload._id)
      if (cartItem.quantity === 1) {
        // delete the element 
        state.cartItems = state.cartItems.filter((item) => item._id !== action.payload._id)
        state.total -= cartItem.price
      }
      else {
        cartItem.quantity -= 1
        state.total -= cartItem.price
      }
    }, 

    reset: (state) => {
      state.cartItems = []
      state.total = 0
    }

  },
});

export const { addProduct, deleteProduct, increase, decrease, reset } = cartSlice.actions;
export default cartSlice.reducer;
