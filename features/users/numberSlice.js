import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    number:0,
    message:""
}

const numberSlice = createSlice({
    name:"number",
    initialState,
    reducers:{
        increamentNumber:(state, action) => {
            state.number += action.payload;
            state.message = action.name;
        },
        decreamentNumber: (state, action) => {
            state.number -= action.payload;
            state.message = action.name;
        },
        resetNumber:(state) => {
            state.number = 0;
            state.message = "";
        }
    }
});

export default numberSlice.reducer;
export const {resetNumber, increamentNumber, decreamentNumber} = numberSlice.actions