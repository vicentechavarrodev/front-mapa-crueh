import React from "react";
import { connect } from "react-redux";
import { setMapCenter, setMapZoom, addMarker } from "./slices";
import { abrir_dialogo } from "../dialogs/slices";
import { obtener_mesas } from "./services";
import AlertCustomDialog from "../dialogs/index";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { Ambulance } from "lucide-react";

const Mapa = ({
  contador,
  obtener_mesas,
  abrir_dialogo,
  setMapCenter,
  setMapZoom,
  addMarker,
  center,
  zoom,
  markers,
  posiciones,
}) => {
  const Enviar = () => {
    //incrementar(1);
    //obtener_session();
    abrir_dialogo({
      mostrar_dialogo: true,
      descripcion: "Prueba general ",
      titulo: "titulo de prueba",
    });
  };

  const EnviarDatos = () => {
    console.log("enviando...");

    return abrir_dialogo({
      mostrar_dialogo: false,
      descripcion: "",
      titulo: "",
    });
  };

  const handleMapCameraChanged = (event) => {
    setMapCenter(event.detail.center);
    setMapZoom(event.detail.zoom);
  };

  const handleMapClick = (event) => {
    const newMarker = {
      position: { lat: event.detail.latLng.lat, lng: event.detail.latLng.lng },
      id: Date.now(), // Simple unique ID
    };
    addMarker(newMarker);
  };
  return (
    <APIProvider apiKey="AIzaSyD-LTFrMgrDrXBGYCXolovaGeMg3HxKpHM">
      <div style={{ height: "100%", width: "100%" }}>
        <Map
          mapId={"e9c2ac2a270ec4d653d29524"}
          center={center}
          zoom={zoom}
          onCameraChanged={handleMapCameraChanged}
          onClick={handleMapClick}
        >
          {posiciones.map((p, index) => (
            <AdvancedMarker key={index} position={{ lat: p.lat, lng: p.lng }}>
              <Ambulance size={32} />
            </AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
};

const mapStateToProps = (state) => ({
  contador: state.map.contador,
  opciones: state.map.opciones,
  markers: state.map.markers,
  center: state.map.center,
  zoom: state.map.zoom,
  posiciones: state.web_socket.posiciones,
});

const mapDispatchToProps = (dispatch) => ({
  incrementar: (valor) => dispatch(incrementar(valor)),
  obtener_mesas: () => dispatch(obtener_mesas()),
  obtener_session: () => dispatch(obtener_session()),
  abrir_dialogo: (value) => dispatch(abrir_dialogo(value)),
  setMapCenter: (value) => dispatch(setMapCenter(value)),
  setMapZoom: (value) => dispatch(setMapZoom(value)),
  addMarker: (value) => dispatch(addMarker(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Mapa);
