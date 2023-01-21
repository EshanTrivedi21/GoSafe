import { Button, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import apiPost from "../utilities/apiCall";
import { apiCheckLogin } from "../utilities/apiCall";
import { Theme } from "../assets/theme";
import { Link, useNavigate, useLocation } from "react-router-dom";

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

export default function Add() {
  const location = useLocation();
  let img = location.state || null;
  let [Problem, setProblem] = React.useState("");
  let [user, setUser] = React.useState(null);
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
  function handleSubmit(e) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((position) => {
      let data = new FormData();
      // fetch(Image)
      //   .then((res) => res.blob())
      //   .then((blob) => {
      // const file = new File([Image], "image.jpeg", { type: "image/jpeg" });
      let base64Data = img.img.replace(/^data:image\/png;base64,/, "");
      // console.log(base64Data);
      data.append("Image", base64Data);
      data.append("Problem", Problem);
      data.append("lat", position.coords.latitude);
      data.append("lng", position.coords.longitude);
      apiPost("add/pothole", data, setUser);
    });
  }
  useEffect(() => {
    if (user) {
      if (!user.err) navigate("/");
    }
  }, [user]);
  return (
    <Theme>
      <svg
        className="w-7 absolute inset-0 mt-5 ml-5"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        onClick={() => window.history.back()}
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />

      </svg>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full h-[100vh] flex justify-center items-center flex-col bg-[#13724A] gap-5"
      >
        {img ? (
          <img
            src={img.img}
            className="w-80 border-2 border-[#000] rounded-lg mb-5"
            alt=""
          />
        ) : (
          <Link
            to="/cam"
            className="w-80 h-80 bg-slate-500 rounded-lg flex items-center justify-center text-2xl"
          >
            ADD +
          </Link>
        )}
        <CssTextField
          label="Problem Faced"
          variant="outlined"
          multiline
          minRows={4}
          onChange={(e) => setProblem(e.target.value)}
          sx={{
            width: "80%",
          }}
        />
        <div className="flex flex-col justify-center items-center mt-7">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "custom.main",
              color: "custom.contrastText",
              width: { mobile: "112.5%", tablet: "40%", laptop: "40%" },
            }}
            type="submit"
          >
            Report Pothole
          </Button>
          <Typography
            variant="h6"
            color="primary.contrastText"
            sx={{
              fontStyle: "italic",
              fontSize: "0.65rem",
              textAlign: "center",
              textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
              mt: 2,
            }}
          >
            "I Confirm that the Image Provided is not Misleading"
          </Typography>
        </div>
      </form>
    </Theme>
  );
}
