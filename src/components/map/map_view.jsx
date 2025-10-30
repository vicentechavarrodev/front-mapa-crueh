import React, { useEffect } from "react";
import geojsonData from "../../data_geojson/comunas_neiva.json";
import { Map, AdvancedMarker, useMap } from "@vis.gl/react-google-maps";
import { Ambulance } from "lucide-react";
import { connect } from "react-redux";
import { setMapCenter, setMapZoom, addMarker } from "./slices";

const MapView = ({
  center,
  zoom,
  posiciones,
  setMapCenter,
  setMapZoom,
  addMarker,
}) => {
  const current_map = useMap();

  useEffect(() => {
    if (!current_map) return;

    current_map.data.addGeoJson(geojsonData);
    current_map.data.setStyle(function (feature) {
      // Example: Color polygons based on a property

      const propertyValue = feature.getProperty("name"); // Assuming a 'name' property

      console.log(propertyValue);

      return {
        fillColor: "#ff0303ff",
        strokeWeight: 1,
        strokeColor: "#ff0a0aff", // Black stroke for all features
      };
    });
  }, [current_map]);

  const handleMapCameraChanged = (event) => {
    setMapCenter(event.detail.center);
    setMapZoom(event.detail.zoom);
  };

  const handleMapClick = (event) => {
    const newMarker = {
      position: { lat: event.detail.latLng.lat, lng: event.detail.latLng.lng },
      id: Date.now(),
    };

    addMarker(newMarker);
  };

  const handleMarkerClick = (event) => {
    console.log(current_map);
    //map.flyTo({ center: [-74.5, 40], zoom: 9 });
  };

  return (
    <Map
      mapId={"e9c2ac2a270ec4d653d29524"}
      center={center}
      zoom={zoom}
      handleMapCameraChanged={handleMapCameraChanged}
      onCameraChanged={handleMapCameraChanged}
    >
      {posiciones.map((p, index) => (
        <AdvancedMarker
          key={index}
          position={{ lat: p.lat, lng: p.lng }}
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
});

const mapDispatchToProps = (dispatch) => ({
  abrir_dialogo: (value) => dispatch(abrir_dialogo(value)),
  setMapCenter: (value) => dispatch(setMapCenter(value)),
  setMapZoom: (value) => dispatch(setMapZoom(value)),
  addMarker: (value) => dispatch(addMarker(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
