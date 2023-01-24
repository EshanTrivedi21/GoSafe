import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Theme } from "../assets/theme.js";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { apiCheckLogin } from "../utilities/apiCall";
import axios from "axios";

const CssTextField = styled(TextField)({
  label: {
    color: "#fff",
  },
  "&.MuiTextField-root": {
    backgroundColor: "#165C3F",
  },
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& label.Mui-disabled": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    "& fieldset": {
      borderColor: "#000",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
});

mapboxgl.accessToken =
  "pk.eyJ1IjoiZXNoYW50cml2ZWRpMjEiLCJhIjoiY2xjaXV6c2lqMTFzNjNvcXVmbzM0aGkwNyJ9.ZsRWT2z--97ajM58KQG4xQ";

export default function Home() {
  const [progress, setProgress] = React.useState(0);
  const [color, setColor] = React.useState("");
  const [text, setText] = useState("");

  const [routeData, setRouteData] = useState(null);

  function search() {
    fetch(
      "https://api.unl.global/v2/geocode/forward?" +
        new URLSearchParams({
          query: text,
          country: "IN",
          limit: 10,
        }),
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-unl-api-key": "Ddm47D4q7Iq7ci026pTvaMsIDpinlJNl",
          "x-unl-vpm-id": "2d2639a7-b6d6-403a-b84c-95b63af2cae8",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        navigator.geolocation.getCurrentPosition((position) => {
          // let my = Geohash.encode(
          //   position.coords.latitude,
          //   position.coords.longitude,
          //   9
          // );
          // let way = Geohash.encode(
          //   response.features[0].geometry.coordinates[1],
          //   response.features[0].geometry.coordinates[0],
          //   9
          // );
          // console.log(my, way);
          let a = `${position.coords.longitude},${position.coords.latitude};${response.features[0].geometry.coordinates[0]},${response.features[0].geometry.coordinates[1]}`;
          axios
            .get(`https://api.mapbox.com/directions/v5/mapbox/driving/${a}`, {
              params: {
                access_token: mapboxgl.accessToken,
                geometries: "geojson",
                steps: true,
                overview: "full",
                alternatives: true,
                exclude: "unpaved",
              },
              withCredentials: false,
            })
            .then((res) => {
              setRouteData(res);
              const geojson = res.data.routes[0].geometry;
              addRoute(geojson);
              addTrafficRoute(geojson);
            })
            .catch((err) => {});
        });
      });
  }
  function addRoute(coords) {
    if (map.current.getSource("route")) {
      map.current.removeLayer("route");
      map.current.removeSource("route");
    } else {
      map.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: coords,
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#03AA46",
          "line-width": 8,
          "line-opacity": 0.8,
        },
      });
    }
  }
  useEffect(() => {
    setProgress(Math.floor(Math.random() * (90 - 60 + 1) + 60));
    if (progress >= 80) {
      setColor("#2aa10f");
    } else if (progress >= 70) {
      setColor("#ffaa1c");
    } else if (progress >= 60) {
      setColor("#ed2938");
    }
  }, [progress, routeData]);

  function clickHandler() {
    document.querySelector(".searchDiv").style.display = "none";
  }
  React.useEffect(() => {
    if (text.length !== 0) {
      if (document.querySelector(".searchDiv").style.display === "none") {
        document.querySelector(".searchDiv").style.display = "block";
      }
    }
  }, [text]);

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
  function addTrafficRoute(coords) {
    if (map.current.getSource("traffic-route")) {
      map.current.removeLayer("traffic-route");
      map.current.removeSource("traffic-route");
    } else {
      map.current.addLayer({
        id: "traffic-route",
        type: "heatmap",
        source: {
          type: "geojson",
          data: coords,
        },
        paint: {
          "heatmap-intensity": [
            "interpolate",
            ["linear"],
            ["zoom"],
            0,
            1,
            9,
            3,
          ],
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(33,102,172,0)",
            0.2,
            "rgb(103,169,207)",
            0.4,
            "rgb(209,229,240)",
            0.6,
            "rgb(253,219,199)",
            0.8,
            "rgb(239,138,98)",
            1,
            "rgb(178,24,43)",
          ],
          "heatmap-radius": 10,
          "heatmap-opacity": 1,
        },
      });
    }
  }

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

  useEffect(() => {
    if (!map.current) return;
    map.current.on("load", () => {
      axios
        .get(
          `https://api.mapbox.com/traffic-data/v1/flow?coordinates=${72.884217},${19.150826};${72.829198},${19.106933}`,
          {
            params: {
              access_token: mapboxgl.accessToken,
            },
            withCredentials: false,
          }
        )
        .then((res) => {
          console.log(res);
          const geojson = res.data;
          addTrafficRoute(geojson);
        });
    });
  }, []);

  return (
    <Theme>
      <div className="h-[100vh] w-full flex flex-col justify-center items-center">
        <div className="relative flex flex-col justify-center items-center">
          <div className="absolute top-3 bg-[#13724A] z-10 w-[95vw] h-[15vh] flex flex-col justify-center items-center rounded-lg  gap-3">
            <div className="flex justify-center items-center">
              <svg
                width="25"
                height="25"
                viewBox="0 0 21 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.0175 9.23501C19.8595 7.53041 19.2786 5.89728 18.3313 4.49464C17.384 3.09199 16.1026 1.96765 14.6119 1.23109C13.1211 0.494529 11.4719 0.170855 9.82467 0.291585C8.17748 0.412315 6.58851 0.973335 5.21249 1.92001C4.03033 2.73977 3.03792 3.82086 2.30655 5.08564C1.57518 6.35041 1.12299 7.76747 0.982488 9.23501C0.844656 10.6929 1.0215 12.1644 1.50018 13.5427C1.97886 14.9209 2.74738 16.1714 3.74999 17.2033L9.71249 23.3983C9.81707 23.5077 9.9415 23.5945 10.0786 23.6537C10.2157 23.713 10.3627 23.7434 10.5112 23.7434C10.6598 23.7434 10.8068 23.713 10.9439 23.6537C11.081 23.5945 11.2054 23.5077 11.31 23.3983L17.25 17.2033C18.2526 16.1714 19.0211 14.9209 19.4998 13.5427C19.9785 12.1644 20.1553 10.6929 20.0175 9.23501ZM15.675 15.5583L10.5 20.925L5.32499 15.5583C4.56234 14.7674 3.97814 13.8111 3.61439 12.7581C3.25064 11.7051 3.11637 10.5816 3.22124 9.46835C3.32678 8.33797 3.67322 7.24604 4.23551 6.2715C4.79779 5.29696 5.56186 4.46417 6.47249 3.83335C7.66605 3.01112 9.06708 2.57253 10.5 2.57253C11.9329 2.57253 13.3339 3.01112 14.5275 3.83335C15.4354 4.46173 16.1977 5.29084 16.7599 6.26111C17.322 7.23138 17.67 8.31872 17.7787 9.44502C17.887 10.562 17.7544 11.69 17.3906 12.7473C17.0267 13.8046 16.4407 14.7648 15.675 15.5583ZM10.5 5.00001C9.49872 5.00001 8.51994 5.30792 7.68742 5.8848C6.85489 6.46168 6.20602 7.28161 5.82285 8.24093C5.43968 9.20024 5.33943 10.2558 5.53476 11.2742C5.7301 12.2926 6.21226 13.2281 6.92026 13.9623C7.62826 14.6966 8.53032 15.1966 9.51234 15.3991C10.4944 15.6017 11.5123 15.4977 12.4373 15.1004C13.3624 14.703 14.153 14.0301 14.7093 13.1668C15.2656 12.3034 15.5625 11.2884 15.5625 10.25C15.5595 8.85858 15.0252 7.52501 14.0764 6.54111C13.1277 5.55721 11.8417 5.0031 10.5 5.00001ZM10.5 13.1667C9.94373 13.1667 9.39996 12.9956 8.93745 12.6751C8.47493 12.3546 8.11445 11.8991 7.90158 11.3662C7.68871 10.8332 7.63301 10.2468 7.74153 9.681C7.85005 9.11522 8.11792 8.59552 8.51125 8.18762C8.90459 7.77972 9.40573 7.50193 9.9513 7.38939C10.4969 7.27685 11.0624 7.33461 11.5763 7.55537C12.0902 7.77612 12.5295 8.14996 12.8385 8.6296C13.1475 9.10925 13.3125 9.67315 13.3125 10.25C13.3125 11.0236 13.0162 11.7654 12.4887 12.3124C11.9613 12.8594 11.2459 13.1667 10.5 13.1667Z"
                  fill="white"
                />
              </svg>
              <CssTextField
                id="outlined-basic"
                label="Your Location"
                variant="outlined"
                size="small"
                fullWidth
                disabled
                sx={{ width: "75vw", ml: 2 }}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-center items-center">
              <svg
                width="22"
                height="25"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="white"
              >
                <path d="M306.7 325.1L162.4 380.6C142.1 388.1 123.9 369 131.4 349.6L186.9 205.3C190.1 196.8 196.8 190.1 205.3 186.9L349.6 131.4C369 123.9 388.1 142.1 380.6 162.4L325.1 306.7C321.9 315.2 315.2 321.9 306.7 325.1V325.1zM255.1 224C238.3 224 223.1 238.3 223.1 256C223.1 273.7 238.3 288 255.1 288C273.7 288 288 273.7 288 256C288 238.3 273.7 224 255.1 224V224zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
              </svg>
              <CssTextField
                id="outlined-basic"
                label="To"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ width: "75vw", ml: 2 }}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </div>
          </div>
          {text.length !== 0 ? (
            <div
              className="searchDiv absolute top-[18vh] z-10 w-[95vw] flex flex-col justify-center items-center rounded-lg"
              onClick={clickHandler}
            >
              <Button
                type="submit"
                id="search--div"
                className="searchLoc"
                variant="contained"
                sx={{
                  width: "95vw",
                  fontSize: "1rem",
                }}
                onClick={search}
              >
                Find Best Route
              </Button>
            </div>
          ) : null}
        </div>
        <div ref={mapContainer} className="map-container w-full h-full" />
        <div className="absolute bottom-[8vh] bg-[#13724A] z-10 w-[95vw] h-[10vh] flex flex-col justify-center items-center rounded-lg  gap-3">
          <div
            onClick={() => navigate("/cam")}
            className="border-2 border-[#13724A] absolute -top-8 bg-white w-[70px] h-[70px] flex flex-col justify-center items-center rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#13724A"
              viewBox="0 0 512 512"
              className="w-[60%] h-auto m-auto"
            >
              <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z" />
            </svg>
          </div>
          {routeData ? (
            <div className="flex justify-center items-center w-[95vw] gap-3 mt-5">
              <h2
                style={{
                  color: "#fff",
                  fontSize: "1.1rem",
                  letterSpacing: "1px",
                  fontWeight: "600",
                }}
              >
                RQI :
              </h2>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  backgroundColor: "#cfcfcf",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: color,
                  },
                  width: "75%",
                  height: "10px",
                  borderRadius: "10px",
                }}
              />
            </div>
          ) : null}
        </div>
        <div className="absolute bottom-3 bg-[#13724A] z-10 w-[95vw] h-[5vh] flex flex-col justify-center items-center rounded-lg  gap-3">
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "95vw",
              fontSize: "1rem",
            }}
            onClick={() => navigate("/profile")}
          >
            My Profile
          </Button>
        </div>
      </div>
    </Theme>
  );
}
