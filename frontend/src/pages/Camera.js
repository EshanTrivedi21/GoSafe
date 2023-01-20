import React from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { Typography } from "@mui/material";
const videoConstraints = {
  width: 768,
  height: 768,
  facingMode: "environment",
};
export default function Camera() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col bg-[#13724A]">
      <svg
        className="w-7 absolute inset-0 mt-5 ml-5"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        onClick={() => window.history.back()}
      >
        <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
      </svg>
      <Typography
        variant="h3"
        component="h2"
        color="primary.contrastText"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          mt: { mobile: 2, tablet: 5, laptop: 5 },
          mb: 5,
          textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
          fontSize: "2rem",
        }}
      >
        Capture Pothole
      </Typography>
      <Webcam
        audio={false}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        className="w-80 border-2 border-[#000] border-b-0"
      >
        {({ getScreenshot }) => (
          <button
            className="bg-[#165C3F] w-80 h-20 border-2 border-[#000]"
            onClick={() => {
              const imageSrc = getScreenshot();
              navigate("/add", { state: { img: imageSrc } });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 512 512"
              className="w-[32px] h-auto m-auto"
            >
              <path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z" />
            </svg>
          </button>
        )}
      </Webcam>
      <Typography
                variant="h6"
                color="primary.contrastText"
                sx={{
                  fontStyle: "italic",
                  letterSpacing: "0.1rem",
                  textAlign: "center",
                  textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                  mt: 7,
                  fontSize: "0.9rem",
                }}
              >
                Make sure Pothole is in the Frame.
              </Typography>
    </div>
  );
}
