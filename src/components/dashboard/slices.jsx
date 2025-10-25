import { createSlice } from "@reduxjs/toolkit";
import { dashboard_constants } from "./constants";
import { initial_state } from "./initial_state";

const dashboard_slice = createSlice({
  name: dashboard_constants.DASHBOARD_SLICE,
  initialState: initial_state,
  reducers: {
    mostrar: (state, action) => {
      state.mostrar = true;
    },
  },
});

export const { mostrar } = dashboard_slice.actions;

export default dashboard_slice.reducer;
