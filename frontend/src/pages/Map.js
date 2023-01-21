import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const Map = ({ destination }) => {
    const [map, setMap] = useState(null);
    const [marker, setMarker] = useState(null);
    const mapContainer = useRef(null);
  
    useEffect(() => {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZXNoYW50cml2ZWRpMjEiLCJhIjoiY2xjaXV6c2lqMTFzNjNvcXVmbzM0aGkwNyJ9.ZsRWT2z--97ajM58KQG4xQ';
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 10
      });
  
      map.on('load', () => {
        setMap(map);
        map.resize();
        navigator.geolocation.getCurrentPosition(position => {
          const { longitude, latitude } = position.coords;
          map.setCenter([longitude, latitude])
          setMarker(new mapboxgl.Marker({ color: "green" }).setLngLat([longitude, latitude]).addTo(map));
          const start = `${longitude},${latitude}`;
          const end = `${destination.lng},${destination.lat}`;
          const url = `https://api.mapbox.com/directions/v5/mapbox/driving-unpaved/${start};${end}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
          fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .then(data => {
              if (data.routes.length > 0) {
                map.addLayer({
                  id: 'route',
                  type: 'line',
                  source: {
                    type: 'geojson',
                    data: {
                      type: 'Feature',
                      properties: {},
                      geometry: data.routes[0].geometry,
                    },
                  },
                  layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                  },
                  paint: {
                    'line-color': 'green',
                    'line-width': 8,
                  },
                });
              }
            })
            .catch(error => {
              console.log(error);
            });
        });
      });
    }, []);
  
    return <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />;
  };

export default Map;