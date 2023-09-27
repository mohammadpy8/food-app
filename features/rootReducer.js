import { combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./users/usersSlice";
import counterSlice from "./counter/counterSlice";
import numberSlice from "./users/numberSlice";
import productsSlice from "./filtresProducts/productsSlice";

const rootReducer = combineReducers({
    users: usersSlice,
    counter: counterSlice,
    number: numberSlice,
    products: productsSlice,
});

export default rootReducer;