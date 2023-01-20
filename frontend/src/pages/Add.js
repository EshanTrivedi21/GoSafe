import { Button, TextField } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Theme } from "../assets/theme";

export default function Add() {
  const location = useLocation();
  let img = location.state || null;
  return (
    <Theme>
      <div className="w-full h-[100vh] flex justify-center items-center flex-col bg-[#13724A] gap-6">
        {img ? (
          <img src={img.img} className="w-80 rounded-lg" />
        ) : (
          <Link
            to="/cam"
            className="w-80 h-80 bg-slate-500 rounded-lg flex items-center justify-center text-2xl"
          >
            ADD +
          </Link>
        )}
        <TextField variant="outlined" placeholder="Problem " className="w-80" />
        <Button
          variant="outlined"
          className="w-80"
          sx={{
            backgroundColor: "rgb(255, 255, 255, 0.1)",
            borderColor: "custom.main",
            color: "custom.main",
            padding: "0.5rem 0",
          }}
        >
          Submit
        </Button>
      </div>
    </Theme>
  );
}
