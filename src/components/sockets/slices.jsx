import { createSlice } from "@reduxjs/toolkit";
import { socket_constants } from "./constants";
import { initial_state } from "./initial_state";
import { obtener_session } from "./services";

const ws_slice = createSlice({
  name: socket_constants.SOCKET_SLICE,
  initialState: initial_state,
  reducers: {
    ws_conectado: (state, action) => {
      state.conectado = true;
    },
    ws_mensaje: (state, action) => {
      const posiciones = JSON.parse(action.payload);

      console.log(state.center);
      if (posiciones.positions != null) {
        state.posiciones = [];
        posiciones.positions.map((p, index) => {
          const { latitude, longitude, deviceId } = p;
          state.posiciones.push({
            lat: latitude,
            lng: longitude,
            id: deviceId,
          });
        });
      }
    },
    ws_desconectado: (state, action) => {
      state.conectado = false;
    },
    ws_error: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtener_session.fulfilled, (state, action) => {
        if (action.payload == null) return;
        state.token = action.payload;
      })
      .addCase(obtener_session.rejected, (state, action) => {});
  },
});

export const { ws_conectado, ws_desconectado, ws_mensaje, ws_error } =
  ws_slice.actions;

export default ws_slice.reducer;
