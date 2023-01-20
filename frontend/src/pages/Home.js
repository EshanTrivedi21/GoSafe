import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link, useNavigate } from "react-router-dom";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { apiCheckLogin } from "../utilities/apiCall";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZXNoYW50cml2ZWRpMjEiLCJhIjoiY2xjaXV6c2lqMTFzNjNvcXVmbzM0aGkwNyJ9.ZsRWT2z--97ajM58KQG4xQ";

export default function Home() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(72.8777);
  const [lat, setLat] = useState(19.076);
  const [zoom, setZoom] = useState(9);
  let [a, setA] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!a) {
      apiCheckLogin(setA);
    }
    
  }, []);
  React.useEffect(() => {
    if (a) {
      if (a.err) {
        navigate("/welcome");
      }
    }
  }, [a]);
  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });
    navigator.geolocation.getCurrentPosition((position) => {
      const el = document.createElement("div");
      el.className = "marker";
      console.log(position.coords.latitude, position.coords.longitude);
      new mapboxgl.Marker(el)
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(map.current);
    });
  }, []);
  return (
    <div className="h-[100vh] w-full">
      <div ref={mapContainer} className="map-container w-full h-full" />
    </div>
  );
}
