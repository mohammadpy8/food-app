import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  isLoading: false,
  error: "",
};

const fetchUsers = createAsyncThunk("users/FetchUsers", async () => {
    return await axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.data);
});

const UserSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.error = ""
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.users = [];
        state.error = action.error.message;
    });
  },
});


export default UserSlice.reducer;

export {fetchUsers}
