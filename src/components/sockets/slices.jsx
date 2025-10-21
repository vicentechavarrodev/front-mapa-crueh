import { createSlice } from "@reduxjs/toolkit";
import { socket_constants } from "./constants";
import { initial_state } from "./initial_state";

const ws_slice = createSlice({
  name: socket_constants.SOCKET_SLICE,
  initialState: initial_state,
  reducers: {
    wsConnected: (state) => {
      state.isConnected = true;
      state.error = null;
    },
    wsDisconnected: (state) => {
      state.isConnected = false;
    },
    wsMessageReceived: (state, action) => {
      state.posticiones.clear();
      const posiciones = JSON.parse(action.payload);

      if (posiciones.positions != null) {
        posiciones.positions.map((p, index) => {
          const { latitude, longitude } = p;
          state.posticiones.push({ lat: latitude, lng: longitude });
        });

        console.log("Posición recibida:", state.posticiones);
      }

      if (action.payload.positions != null) {
      }
    },
    wsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { wsConnected, wsDisconnected, wsMessageReceived, wsError } =
  ws_slice.actions;
export default ws_slice.reducer;
