import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const dispatch = useDispatch();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (action) => {
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    },
    LOGOUT: () => {
      return {
        user: null,
        isAuthenticated: false,
      };
    },
  },
});

export const { LOGOUT, LOGIN } = authSlice.actions;

const FAKE_USER = {
  name: "ex",
  email: "m@gmail.com",
  password: "123456",
};

const Login = (email, password) => {
  if (email === FAKE_USER.email && password === FAKE_USER.password) {
    dispatch(LOGIN(FAKE_USER));
  }
};

const Logout = () => {
  dispatch(LOGOUT());
};

export { Login, Logout };
