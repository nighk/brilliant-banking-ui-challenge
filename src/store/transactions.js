import { createSlice } from "@reduxjs/toolkit";
import api from "../utils/api";

const slice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    loading: false,
    hasLoaded: false
  },
  reducers: {
    populateList: (state, action) => {
      state.list = action.payload;
      state.hasLoaded = true;
    },
    clearList: (state, action) => {
      state.list = [];
      state.hasLoaded = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export default slice.reducer;

const { populateList, clearList, setLoading } = slice.actions;

export const getTransactions = accountId => async dispatch => {
  try {
    dispatch(setLoading(true));
    const res = await api.get(`/accountDetails/${accountId}`);
    dispatch(populateList(res.data));
    dispatch(setLoading(false));
  } catch (e) {
    console.warn(e.message);
  }
}

export const clearTransactions = () => dispatch => {
    dispatch(clearList());
}