import { createSlice } from "@reduxjs/toolkit";
import { dialog_constants } from "./constants";
import { initial_state } from "./initial_state";

const dialog_slice = createSlice({
  name: dialog_constants.DIALOG_SLICE,
  initialState: initial_state,
  reducers: {
    abrir_dialogo: (state, action) => {
      state.opciones = action.payload;
    },
  },
});

export const { abrir_dialogo } = dialog_slice.actions;
export default dialog_slice.reducer;
