import { configureStore } from "@reduxjs/toolkit";
import areaReducer from "./reducers/areaSlice";
import cartReducer from "./reducers/cartSlice";
import categoryReducer from "./reducers/categorySlice";
import mealReducer from "./reducers/mealSlice";
import youtbeReducer from "./reducers/youtbeSlice";

export const store = configureStore({
    reducer: {
       category: categoryReducer,
       meal: mealReducer,
       mealYt: youtbeReducer,
       area: areaReducer,
       cart: cartReducer
    }
})