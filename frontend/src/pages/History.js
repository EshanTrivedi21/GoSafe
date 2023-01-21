import React,{ useEffect }  from "react";
import { LinearProgress } from "@mui/material";

const History = (props) => {
    const [progress, setProgress] = React.useState(0);
  const [color, setColor] = React.useState("");

  useEffect(() => {
    setProgress(Math.floor(Math.random() * (90 - 60 + 1) + 60));
    if (progress >= 80) {
      setColor("#2aa10f");
    } else if (progress >= 70) {
      setColor("#ffaa1c");
    } else if (progress >= 60) {
      setColor("#ed2938");
    }
  }, [progress]);
  return (
    <>
      <div className="flex flex-row justify-center items-center gap-5">
        <img
          src={require(`../assets/${props.image}`)}
          alt=""
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            border: "2px solid #fff",
          }}
        />
        <div className="flex flex-col justify-center items-center gap-2">
          <h1
            style={{
              color: "#fff",
              fontSize: "1.3rem",
            }}
          >
            {props.location}
          </h1>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              backgroundColor: "#cfcfcf",
              "& .MuiLinearProgress-bar": {
                backgroundColor: color,
              },
              width: "98%",
              height: "5px",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default History;
