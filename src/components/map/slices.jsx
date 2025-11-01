import { createSlice } from "@reduxjs/toolkit";
import { map_constants } from "./constants";
import { initial_state } from "./initial_state";
import { obtener_mesas } from "./services";
import { loader } from "../../utils/loader";

const map_slice = createSlice({
  name: map_constants.MAPSLICE,
  initialState: initial_state,
  reducers: {
    asignar_map_center: (state, action) => {
      state.center = action.payload;
    },
    asignar_map_zoom: (state, action) => {
      state.zoom = action.payload;
    },
    agregar_marker: (state, action) => {
      state.markers.push(action.payload);
    },
    actualizar_marker: (state, action) => {
      const { lat, lng, id } = action.payload;

      state.markers.map((marker) =>
        marker.id === id ? { ...marker, position: { lat, lng } } : marker
      );
    },
    asignar_id_animation: (state, action) => {
      state.animationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(obtener_mesas.pending, (state, action) => {
        state.cargando = true;
        loader.show();
      })
      .addCase(obtener_mesas.rejected, (state, action) => {
        state.cargando = false;
        loader.hide();
        console.log(action);
        (state.mesas = []), (state.error = action.payload);
      })
      .addCase(obtener_mesas.fulfilled, (state, action) => {
        state.cargando = false;
        loader.hide();
        state.mesas = action.payload;
      });
  },
});

export const {
  asignar_map_center,
  asignar_map_zoom,
  agregar_marker,
  updateMarker,
  actualizar_marker,
  asignar_id_animation,
} = map_slice.actions;
export default map_slice.reducer;
