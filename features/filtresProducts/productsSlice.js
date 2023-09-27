import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [],
  itemsCounter: 0,
  total: 0,
  checkout: false,
};

const sumItems = (items) => {
  const itemsCounter = items.reduce(
    (total, products) => total + products.quantity,
    0
  );
  const total = items
    .reduce((total, products) => total + products.quantity * products.price, 0)
    .toFixed(2);

  return {
    total,
    itemsCounter,
  };
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
          ...sumItems(state.selectedItems),
          checkout: false,
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
        ...sumItems(state.selectedItems),
      };
    },
    INCREASE: (state, action) => {
      const IndexI = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[IndexI].quantity++;
      return {
        ...state,
        ...sumItems(state.selectedItems),
      };
    },
    DECREASE: (state, action) => {
      const IndexD = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id
      );
      state.selectedItems[IndexD].quantity--;
      return {
        ...state,
        ...sumItems(state.selectedItems),
      };
    },
    CHECKOUT: () => {
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: true,
      };
    },
    CLEAR: () => {
      return {
        selectedItems: [],
        itemsCounter: 0,
        total: 0,
        checkout: false,
      };
    },
  },
});

export default productsSlice.reducer;
export const { ADDITEMS, REMOVEITEMS, INCREASE, DECREASE, CHECKOUT, CLEAR } =
  productsSlice.actions;
