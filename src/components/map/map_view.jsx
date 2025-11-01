import React, { useEffect } from "react";
import geojsonData from "../../data_geojson/comunas_neiva_polygon.json";
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { Ambulance } from "lucide-react";
import { connect } from "react-redux";
import {
  asignar_map_center,
  asignar_map_zoom,
  agregar_marker,
  actualizar_marker,
  asignar_id_animation,
} from "./slices";

const handleMapClick = (event) => {
  const newMarker = {
    position: { lat: event.detail.latLng.lat, lng: event.detail.latLng.lng },
    id: Date.now(),
  };
  agregar_marker(newMarker);
};

const MapView = ({
  center,
  zoom,
  posiciones,
  markers,
  asignar_map_center,
  asignar_map_zoom,
  agregar_marker,
  actualizar_marker,
  asignar_id_animation,
}) => {
  const current_map = useMap();

  useEffect(() => {
    if (!current_map) return;
    current_map.data.forEach((feature) => map.data.remove(feature));
    current_map.data.addGeoJson(geojsonData);
    current_map.data.addListener("click", (event) => {
      const clickedFeature = event.feature;
      const featureProperties = clickedFeature.getProperty("id");
      console.log(featureProperties);
    });

    current_map.data.setStyle(function (feature) {
      const color = feature.getProperty("color");

      return {
        strokeWeight: 1,
        strokeColor: color,
        fillOpacity: 0.3,
        fillColor: color,
      };
    });
  }, [current_map]);

  const handleMapCameraChanged = (event) => {
    asignar_map_center(event.detail.center);
    asignar_map_zoom(event.detail.zoom);
  };

  const handleMarkerClick = (event) => {
    var latitud = event.latLng.lat();
    var longitude = event.latLng.lng();

    if (current_map) {
      const degreesPerSecond = 3;
      let animationFrameId;

      const animateCamera = (time) => {
        if (current_map) {
          current_map.moveCamera({
            heading: (time / 1000) * degreesPerSecond,
            center: { lat: latitud, lng: longitude },
            tilt: 45,
            zoom: 18,
          });
        }
        animationFrameId = requestAnimationFrame(animateCamera);

        asignar_id_animation(animationFrameId);
      };

      //cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(animateCamera);

      //current_map.moveCamera(flyToCamera);
    }
  };

  return (
    <Map
      mapId={"e9c2ac2a270ec4d653d29524"}
      center={center}
      zoom={zoom}
      onCameraChanged={handleMapCameraChanged}
    >
      {markers.map((m) => (
        <AdvancedMarker
          key={m.id}
          position={m.position}
          onClick={handleMarkerClick}
        >
          <Ambulance size={32} />
        </AdvancedMarker>
      ))}
    </Map>
  );
};

const mapStateToProps = (state) => ({
  center: state.map.center,
  zoom: state.map.zoom,
  posiciones: state.web_socket.posiciones,
  markers: state.web_socket.markers,
});

const mapDispatchToProps = (dispatch) => ({
  abrir_dialogo: (value) => dispatch(abrir_dialogo(value)),
  asignar_map_center: (value) => dispatch(asignar_map_center(value)),
  asignar_map_zoom: (value) => dispatch(asignar_map_zoom(value)),
  agregar_marker: (value) => dispatch(agregar_marker(value)),
  actualizar_marker: (value) => dispatch(actualizar_marker(value)),
  asignar_id_animation: (value) => dispatch(asignar_id_animation(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
