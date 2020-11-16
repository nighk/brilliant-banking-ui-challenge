import { createSlice } from "@reduxjs/toolkit";
import { navigate } from "@reach/router";
import api from "../utils/api";
import consts from "../consts";

const slice = createSlice({
  name: "user",
  initialState: {
    username: null,
    errorMessage: null
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload;
      state.errorMessage = null;
    },
    loginFailure: (state, action) => {
      state.errorMessage = action.payload;
    },
    logoutSuccess: (state, action) =>  {
      state.username = null;
    }
  }
});

export default slice.reducer;

const { loginSuccess, logoutSuccess, loginFailure } = slice.actions;

export const checkLogin = () => async dispatch => {
  try {
    const res = await api.get("/user");
    dispatch(loginSuccess(res.data.username));
  } catch (e) {
    if(e.response.status === 403) {
      navigate(consts.loginPath);
    } else {
      console.error(e.message);
    }
  }
}

export const login = ({ username, password }) => async dispatch => {
  try {
    await api.post("/login", { username, password });
    dispatch(loginSuccess(username));
    navigate(consts.overviewPath);
  } catch (e) {
    if(e.response.status === 403) {
      dispatch(loginFailure(e.response.data));
    } else {
      console.error(e.message);
    }
  }
}

export const logout = () => async dispatch => {
  try {
    await api.get("/logout");
    dispatch(logoutSuccess());
  } catch (e) {
    console.error(e.message);
  }
}