import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)({
  label: {
    color: "#000",
  },
  "&.MuiTextField-root": {
    backgroundColor: "#fff",
  },
  "& label.Mui-focused": {
    color: "#000",
  },
  "& .MuiOutlinedInput-root": {
    color: "#000",
    "& fieldset": {
      borderColor: "#000",
    },
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 3,
  px: 4,
  pb: 3,
};

const Stat = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
