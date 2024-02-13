import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: [],
    total: 0,
    subTotal: 0,
    tax: 0,
    shipping: 0
}

export const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let product = action.payload;
            const isItemPresent = state.cartItems.find((item) => item.id === product.id);
            if(isItemPresent){
                state.cartItems.map((item) => item.id === product.id ? (item.quantity = item.quantity + 1) : (item));
            }
            else{
                state.cartItems.push(product);
            }
        },

        decreaseCartItem: (state, action) => {
            let product = action.payload;  
            const prod = state.cartItems.find((item) => item.id === product.id);

            if (prod && prod.quantity > 1) {
                state.cartItems = state.cartItems.map((item) =>                          
                  item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
                );
              }
        },

        deleteCartItem: (state, action) => {
           state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        },

        calculatePrice: (state) => {
            let sum = state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            state.subTotal = +(sum).toFixed(2);
            state.shipping = state.subTotal > 800 ? 0 : 80;
            state.tax = +(state.subTotal * 0.18).toFixed(2);
            state.total = +(state.subTotal + state.shipping + state.tax).toFixed(2);
        },

        clearCartItem: (state) => {
            state.cartItems = [];
            state.subTotal = 0;
            state.shipping = 0;
            state.tax = 0;
            state.total = 0;
        }
    }
});


export const { addToCart, deleteCartItem, decreaseCartItem, calculatePrice, clearCartItem } = cartSlice.actions;
export default cartSlice.reducer;