import { createSlice } from "@reduxjs/toolkit";
import { map_constants } from "./constants";
import { initial_state } from "./initial_state";
import { obtener_mesas } from "./services";
import { loader } from "../../utils/loader";

const map_slice = createSlice({
  name: map_constants.MAPSLICE,
  initialState: initial_state,
  reducers: {
    setMapCenter: (state, action) => {
      state.center = action.payload;
    },
    setMapZoom: (state, action) => {
      state.zoom = action.payload;
    },
    addMarker: (state, action) => {
      state.markers.push(action.payload);
    },
    updateMarker: (state, action) => {
      const { lat, lng, id } = action.payload;

      state.markers.map((marker) =>
        marker.id === id ? { ...marker, position: { lat, lng } } : marker
      );
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

export const { setMapCenter, setMapZoom, addMarker, updateMarker } =
  map_slice.actions;
export default map_slice.reducer;
