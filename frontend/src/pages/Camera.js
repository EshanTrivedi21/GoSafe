import React from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
const videoConstraints = {
  width: 768,
  height: 768,
  facingMode: "environment",
};
export default function Camera() {
    const navigate = useNavigate();
  return (
    <div className="w-full h-[100vh] flex justify-center items-center flex-col bg-slate-900 gap-6">
      <Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className="rounded-md"
      >
        {({ getScreenshot }) => (
          <button
          className="bg-slate-200 w-20 h-20 rounded-full"
            onClick={() => {
              const imageSrc = getScreenshot();
              navigate('/add', {state: {img: imageSrc}})
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-[32px] h-auto m-auto"><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 384c-53 0-96-43-96-96s43-96 96-96s96 43 96 96s-43 96-96 96z"/></svg>
          </button>
        )}
      </Webcam>
    </div>
  );
}