import React from "react";
import { styled } from "@mui/material/styles";
import { Theme } from "../assets/theme.js";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";

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

const Signup = () => {
  return (
    <>
      <Theme>
        <Grid container justifyContent="center">
          <Grid item mobile={12} tablet={8.5} laptop={5}>
            <Box
              component="form"
              sx={{
                width: "100%",
                minHeight: { mobile: "100vh", tablet: "auto", laptop: "auto" },
                backgroundColor: {
                  mobile: "primary.main",
                  tablet: "secondary.main",
                  laptop: "secondary.main",
                },
                my: "50vh",
                p: 5,
                py: { mobile: 10, tablet: 5, laptop: 5 },
                transform: "translateY(-50%)",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                color="primary.contrastText"
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  mt: { mobile: 2, tablet: 5, laptop: 5 },
                  mb: 2,
                  textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                  fontSize: "2.5rem",
                }}
              >
                Register
              </Typography>
              <Typography
                variant="h6"
                color="primary.contrastText"
                sx={{
                  fontStyle: "italic",
                  letterSpacing: "0.1rem",
                  textAlign: "center",
                  textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                  mb: 8,
                }}
              >
                “Create your Account”
              </Typography>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item mobile={11} tablet={8.5} laptop={4}>
                  <CssTextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item mobile={11} tablet={8.5} laptop={4}>
                  <CssTextField
                    id="outlined-basic"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item mobile={11} tablet={8.5} laptop={4}>
                  <CssTextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item mobile={11} tablet={8.5} laptop={4}>
                  <CssTextField
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Typography
                variant="h6"
                color="primary.contrastText"
                sx={{
                  fontStyle: "italic",
                  fontSize: "0.65rem",
                  textAlign: "center",
                  textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                  mt: 5,
                }}
              > By registering you agree to our terms and conditions</Typography>
              <div className="flex flex-col sm:flex-row justify-center items-center mt-20">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "custom.main",
                  color: "custom.contrastText",
                  width: { mobile: "90%", tablet: "40%", laptop: "40%" },
                }}
              >
                Sign Up
              </Button>
              <Typography
                variant="h6"
                color="primary.contrastText"
                sx={{
                  fontStyle: "italic",
                  fontSize: "0.65rem",
                  textAlign: "center",
                  textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                  mt: 1,
                }}
              > Already have an account Login</Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Theme>
    </>
  );
};

export default Signup;