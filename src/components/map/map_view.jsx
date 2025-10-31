import React, { useEffect } from "react";
import geojsonData from "../../data_geojson/comunas_neiva_polygon.json";
import {
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { Ambulance } from "lucide-react";
import { connect } from "react-redux";
import { setMapCenter, setMapZoom, addMarker, updateMarker } from "./slices";

const MapView = ({
  center,
  zoom,
  posiciones,
  setMapCenter,
  setMapZoom,
  addMarker,
  markers,
  updateMarker,
}) => {
  const current_map = useMap();
  const maps3d = useMapsLibrary("maps3d");

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
    var latitud = event.latLng.lat();
    var longitude = event.latLng.lng();

    if (current_map && maps3d) {
      const flyToCamera = {
        center: { lat: latitud, lng: longitude },
        heading: (2 / 1000) * 3,
        tilt: 45,
        zoom: 18,
      };

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
      handleMapCameraChanged={handleMapCameraChanged}
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
  setMapCenter: (value) => dispatch(setMapCenter(value)),
  setMapZoom: (value) => dispatch(setMapZoom(value)),
  addMarker: (value) => dispatch(addMarker(value)),
  updateMarker: (value) => dispatch(updateMarker(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
