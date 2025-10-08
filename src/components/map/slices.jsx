import { createSlice } from "@reduxjs/toolkit";
import { map_constants } from './constants';
import { initial_state } from './initial_state';
import { obtener_mesas } from './services';

const map_slice = createSlice({
  name: map_constants.MAPSLICE,
  initialState: initial_state,
  reducers: {
    incrementar: (state , action) => {
       state.contador += action.payload;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(obtener_mesas.pending, (state, action) => {
       state.cargando = true;
    }).addCase(obtener_mesas.rejected, (state, action) => {
       state.cargando = false;
       console.log(action);
      (state.mesas = []), (state.error = action.payload);
    }).addCase(obtener_mesas.fulfilled, (state, action) => {
       state.cargando = false;
       state.mesas = action.payload;
    });
  }
});

export const {incrementar} = map_slice.actions;
export default map_slice.reducer;