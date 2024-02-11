import {createSlice} from "@reduxjs/toolkit";
import productList from "../../store_items.json";

export const shopSlice = createSlice({
    name: 'shop',
    initialState: {
        value: {
            storeItems: productList.items,
            cartItems: []
        }
    },
    reducers: {
        setStoreItems: (state, action) => {
            state.value.storeItems = action.payload;
        },
        setCartItems: (state, action) => {
            state.value.cartItems = action.payload;
        }
    }
});

export const { setStoreItems, setCartItems } = shopSlice.actions;
export default shopSlice.reducer;