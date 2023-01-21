import React from "react";
import {
  Checkbox,
} from "@mui/material";

const Stat = (props) => {

  console.log(`../assets/${props.image}`);
  return (
    <>
      <div className="flex flex-row justify-around items-center gap-5 ml-10">
        <Checkbox
        defaultChecked
          sx={{
            position: "absolute",
            left: "25px",
            color: "#fff",
            "&.Mui-checked": {
              color: "#fff",
            },
          }}
        />
        <img
          src={require(`../assets/${props.image}`)}
          alt=""
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            border: "2px solid #fff",
          }}
        />
        <h1
          style={{
            color: "#fff",
            fontSize: "1.5rem",
          }}
        >
          {props.location}
        </h1>
        <h1
          style={{
            color: "#fff",
            fontSize: "1.2rem",
          }}
        >
          by {props.username}, {props.date}
        </h1>
        <h1
          style={{
            color: "#fff",
            fontSize: "1.2rem",
          }}
        >
          Resolved on {props.resolvedDate}
        </h1>
      </div>
    </>
  );
};

export default Stat;
