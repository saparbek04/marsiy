import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartMeals: [],
}

export const cartSlice = createSlice({
    name: "cartMeals",
    initialState,

    reducers: {
        addToCart: (state, actions) => {
            if(state.cartMeals.findIndex(item => item.idMeal === actions.payload.idMeal) === -1) {
                state.cartMeals = [actions.payload, ...state.cartMeals]
            }
        },
        removeCart: (state, actions) => {
            state.cartMeals = state.cartMeals.filter(item => item.idMeal !== actions.payload)
        }
    }
})


export const { addToCart, removeCart } = cartSlice.actions

export default cartSlice.reducer