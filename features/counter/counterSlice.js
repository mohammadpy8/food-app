import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counterValue: 0,
  message:"",
};

const counterSlice = createSlice({
    name: "counter",
    initialState, 
    reducers:{
        increment:(state, aciton) => {
            state.counterValue+=aciton.payload;
        },
        decrement: (state, aciton) => {
            state.counterValue-=aciton.payload;
        }
    }
});

export default counterSlice.reducer
export const {increment, decrement} = counterSlice.actions;