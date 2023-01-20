import React from "react";
import { styled } from "@mui/material/styles";
import { Theme } from "../assets/theme.js";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import apiPost, { apiCheckLogin } from "../utilities/apiCall";

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

const Login = () => {
  let [a, setA] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!a) {
      apiCheckLogin(setA);
    } else {
      if (!a.err) {
        if (a.user.Role === "admin") navigate("/dashboard");
        else navigate("/");
      }
    }
  }, [a]);
  let [Phone, setPhone] = React.useState("");
  let [Password, setPassword] = React.useState("");
  let [user, setUser] = React.useState(null);
  React.useEffect(() => {
    if (user) {
      if (!user.err) {
        console.log(user);
        if (user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    }
  }, [user]);
  async function loginToApp(e) {
    e.preventDefault();
    if (Phone && Password) {
      if (Phone.length < 10) {
        alert("Phone number must be 10 digits");
        return;
      } else {
        await apiPost("auth/login", { Phone, Password }, setUser);
      }
    }
  }
  return (
    <>
      <Theme>
        <Grid container justifyContent="center">
          <Grid item mobile={12} tablet={8.5} laptop={5}>
            <Box
              component="form"
              onSubmit={(e) => {
                loginToApp(e);
              }}
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
                py: { mobile: 20, tablet: 5, laptop: 5 },
                transform: "translateY(-50%)",
                overflow: "hidden",
              }}
            >
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
                  mb: 2,
                  textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                  fontSize: "2.5rem",
                }}
              >
                Welcome Back
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
                “Log into your account”
              </Typography>
              <Grid container justifyContent="center" spacing={3}>
                <Grid item mobile={11} tablet={8.5} laptop={6}>
                  <CssTextField
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    type={"number"}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
                <Grid item mobile={11} tablet={8.5} laptop={6}>
                  <CssTextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type={"password"}
                    onChange={(e) => setPassword(e.target.value)}
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
              >
                {" "}
                By logging in you agree to our terms and conditions
              </Typography>
              <div className="flex flex-col justify-center items-center mt-20">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "custom.main",
                    color: "custom.contrastText",
                    width: { mobile: "90%", tablet: "40%", laptop: "40%" },
                  }}
                  type="submit"
                >
                  Log In
                </Button>
                <Typography
                  variant="h6"
                  component={Link}
                  color="primary.contrastText"
                  to={"/signup"}
                  sx={{
                    fontStyle: "italic",
                    fontSize: "0.65rem",
                    textAlign: "center",
                    textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                    mt: 1,
                  }}
                >
                  {" "}
                  Don't have an account Signup
                </Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Theme>
    </>
  );
};

export default Login;
