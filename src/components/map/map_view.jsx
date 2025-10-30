import React, { useEffect } from "react";
import geojsonData from "../../data_geojson/comunas_neiva_polygon.json";
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
    current_map.data.forEach((feature, index) =>
      console.log(feature.elements[index])
    );
    current_map.data.addGeoJson(geojsonData);
    current_map.data.addListener("click", (event) => {
      const clickedFeature = event.feature;
      const featureProperties = clickedFeature.getProperty("id");
      console.log(featureProperties);
    });
    current_map.data.setStyle(function (feature) {
      const color = feature.getProperty("color");

      return {
        weight: 1,
        fillColor: color,
        color: color,
        fillOpacity: 0.3,
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
