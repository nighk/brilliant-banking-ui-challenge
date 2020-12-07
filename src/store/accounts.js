import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const slice = createSlice({
  name: "accounts",
  initialState: {
    list: {},
    loading: false,
    hasLoaded: false
  },
  reducers: {
    populateList: (state, action) => {
      state.list = action.payload;
      state.hasLoaded = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});

export default slice.reducer;

const { populateList, setLoading } = slice.actions;

export const getAccounts = () => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await api.get("/accounts");
    dispatch(populateList(res.data));
    dispatch(setLoading(false));
  } catch (e) {
    console.warn(e.message);
  }
}