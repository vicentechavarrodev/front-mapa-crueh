import React, { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { abrir_dialogo } from "../dialogs/slices";
import MapView from "./map_view";
import { APIProvider } from "@vis.gl/react-google-maps";

const Mapa = ({ abrir_dialogo }) => {
  return (
    <APIProvider apiKey="AIzaSyD-LTFrMgrDrXBGYCXolovaGeMg3HxKpHM">
      <div style={{ height: "100%", width: "100%" }}>
        <MapView />
      </div>
    </APIProvider>
  );
};
const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  abrir_dialogo: (value) => dispatch(abrir_dialogo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mapa);
