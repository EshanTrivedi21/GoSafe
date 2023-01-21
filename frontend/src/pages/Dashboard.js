import React, { useRef, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import { styled } from "@mui/material/styles";
import apiPost, { apiCheckLogin } from "../utilities/apiCall";
import { useNavigate } from "react-router-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Stat from "./Stat";
import StatDone from "./StatDone";

function getRandomCoordinates(currentLocation, radius) {
  const x0 = currentLocation[0];
  const y0 = currentLocation[1];
  const rd = radius / 111300; // about 111300 meters in one degree

  const u = Math.random();
  const v = Math.random();

  const w = rd * Math.sqrt(u);
  const t = 2 * Math.PI * v;
  const x = w * Math.cos(t);
  const y = w * Math.sin(t);

  const newX = x / Math.cos(y0);

  return [x0 + newX, y0 + y];
}

mapboxgl.accessToken =
  "pk.eyJ1IjoiZXNoYW50cml2ZWRpMjEiLCJhIjoiY2xjaXV6c2lqMTFzNjNvcXVmbzM0aGkwNyJ9.ZsRWT2z--97ajM58KQG4xQ";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(72.8591059);
  const [lat, setLat] = useState(19.192562);
  const [zoom, setZoom] = useState(15);
  let [a, setA] = React.useState(null);
  let [location, setLocation] = React.useState(null);
  let [locationAs, setLocationAs] = React.useState(null);
  let [locationUn, setLocationUn] = React.useState(null);
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
      new mapboxgl.Marker(el)
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(map.current);

      const numberOfMarkers = 250;
      for (let i = 0; i < numberOfMarkers; i++) {
        const randomCoordinates = getRandomCoordinates(
          [position.coords.longitude, position.coords.latitude],
          2000
        );
        const markerDiv = document.createElement("div");
        markerDiv.style.borderRadius = `50px`;
        markerDiv.style.width = `10px`;
        markerDiv.style.height = `10px`;
        markerDiv.style.backgroundColor = `red`;
        markerDiv.addEventListener("click", handleClick);
        new mapboxgl.Marker(markerDiv)
          .setLngLat(randomCoordinates)
          .addTo(map.current);
      }
    });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const StyledPopover = styled(Popover)({
    backgroundColor: "transparent",
    "& .MuiPopover-paper": {
      backgroundColor: "#13724A",
      padding: "10px",
      borderRadius: "10px",
      display: "flex",
      gap: "25px",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
  let [refresh, setRefresh] = React.useState(false);
  useEffect(() => {
    if (location) {
      let c = location;
      let a = c.potholes.filter((item) => {
        if (!item.assigned) {
          return item;
        }
      });
      setLocationUn(a);
      let b = location.potholes.filter((item) => {
        if (item.assigned) {
          return item;
        }
      });
      setLocationAs(b);
    }
  }, [location]);
  useEffect(() => {
    apiPost("get/potholedata", {}, setLocation);
  }, [refresh]);
  return (
    <Box
      sx={{ width: "100%", typography: "body1", height: "100vh" }}
      className="!bg-[#fff]"
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", zIndex: 15 }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
            indicatorColor="white"
            sx={{
              backgroundColor: "#13724A",
              "& .MuiTab-root": {
                color: "#fff !important",
              },
              "& .Mui-selected": {
                borderBottom: "3px solid #fff",
              },
            }}
          >
            <Tab
              label="BMC ADMIN PORTAL"
              value="0"
              sx={{
                width: "400px",
                marginLeft: "-150px",
                fontSize: "20px",
              }}
            />
            <Tab
              label="Map Data"
              value="1"
              sx={{
                width: "150px",
                margin: "0px 50px",
              }}
            />
            <Tab
              label="Incoming Reports"
              value="2"
              sx={{
                width: "200px",
                margin: "0px 50px",
              }}
            />
            <Tab
              label="Resolved Reports"
              value="3"
              sx={{
                width: "200px",
                margin: "0px 50px",
              }}
            />
          </TabList>
        </Box>
        <TabPanel
          value="1"
          sx={{
            "&.MuiTabPanel-root": {
              padding: 0,
            },
          }}
        >
          <div
            ref={mapContainer}
            className="map-container w-[100vw] h-[94vh] inset-0 -z-5"
          />
          <StyledPopover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <h1
              style={{
                color: "#fff",
                fontSize: "1.1rem",
              }}
            >
              Thakur Village, Kandivali
            </h1>
            <h3
              style={{
                color: "#fff",
                fontSize: "0.8rem",
              }}
            >
              by Eshan Trivedi
            </h3>
          </StyledPopover>
        </TabPanel>
        <TabPanel value="2">
          <Stack spacing={2}>
            {locationUn ? (
              locationUn.map((item) => (
                <Item className="!bg-[#165C3F] !drop-shadow-xl !border" key={item._id}>
                  <Stat
                    image={item.Image}
                    username={item.by.Username}
                    key={item._id}
                    id={item._id}
                    setRefresh={setRefresh}
                  />
                </Item>
              ))
            ) : (
              <h1>Loading...</h1>
            )}
          </Stack>
        </TabPanel>
        <TabPanel value="3">
          <Stack spacing={2}>
            {locationAs ? (
              locationAs.map((item) => (
                <Item className="!bg-[#165C3F] !drop-shadow-xl !border" key={item._id}>
                  <StatDone
                    image={item.Image}
                    username={item.by.Username}
                    
                    id={item._id}
                    setRefresh={setRefresh}
                    resolvedDate="21/01/23"
                  />
                </Item>
              ))
            ) : (
              <h1>Loading...</h1>
            )}
            {/* <StatDone
                image="homepage.svg"
                location="Thakur Village, Kandivali"
                username="Eshan Trivedi"
                date="20/01/23"
              /> */}
          </Stack>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
