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
        <button
          onClick={handleOpen}
          className="bg-[#165C3F] text-white px-10 py-1 rounded-md border-white border-2 text-md tracking-widest"
        >
          Assign
        </button>
        <h1
          style={{
            color: "#fff",
            fontSize: "1.2rem",
          }}
        >
          by {props.username}, {props.date}
        </h1>
        <Modal
          open={open}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 500 }}>
            <h1
              id="parent-modal-title"
              className="text-2xl font-bold m-auto text-center"
            >
              Assign Contractor
            </h1>
            <FormControl
              id="parent-modal-description"
              sx={{
                marginTop: "20px",
                width: "100%",
              }}
            >
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="K. Raheja Corp"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#165C3F",
                        },
                      }}
                    />
                  }
                  label="K. Raheja Corp"
                />
                <FormControlLabel
                  value="L&T Construction"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#165C3F",
                        },
                      }}
                    />
                  }
                  label="L&T Construction"
                />
                <FormControlLabel
                  value="Afcons Infrastructure"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#165C3F",
                        },
                      }}
                    />
                  }
                  label="Afcons Infrastructure"
                />
                <FormControlLabel
                  value="Simplex Infrastructures"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#165C3F",
                        },
                      }}
                    />
                  }
                  label="Simplex Infrastructures"
                />
                <FormControlLabel
                  value="HCC Limited"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "#165C3F",
                        },
                      }}
                    />
                  }
                  label="HCC Limited"
                />
              </RadioGroup>
              <CssTextField
                id="outlined-basic"
                label="Additional Details"
                variant="outlined"
                multiline
                minRows={4}
                fullWidth
                sx={{
                  marginTop: "20px",
                }}
              />
              <Button
                variant="contained"
                onClick={handleClose}
                sx={{
                  width: { mobile: "100%", tablet: "40%", laptop: "40%" },
                  margin: "auto",
                  marginTop: "20px",
                  backgroundColor: "#165C3F",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#165C3F",
                  },
                }}
              >
                Assign Contractor
              </Button>
            </FormControl>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Stat;
