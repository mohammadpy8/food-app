import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ADDITEMS: (state, action) => {
      if (!state.selectedItems.find((item) => item.id === action.payload.id)) {
        state.selectedItems.push({
          ...action.payload,
          quantity: 1,
        });
        return {
          ...state,
          selectedItems: [...state.selectedItems],
        };
      }
    },
    REMOVEITEMS: (state, action) => {
      const newSelectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        selectedItems: [...newSelectedItems],
      };
    },
    INCREASE: (state, action) => {
      const IndexI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[IndexI].quantity++;
      return {
        ...state,
      };
    },
    DECREASE: (state, action) => {
      const IndexD = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[IndexD].quantity--;
    },
  },
});
