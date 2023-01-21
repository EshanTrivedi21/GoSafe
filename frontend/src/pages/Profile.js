import React from 'react';
import { Theme } from "../assets/theme.js";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { apiCheckLogin } from "../utilities/apiCall";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
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
  return (
    <>
      <Theme>
        <Grid container justifyContent="center">
          <Grid item mobile={12} tablet={8.5} laptop={5}>
            <Box
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
                py: { mobile: 10, tablet: 3, laptop: 3 },
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
                  mt: { mobile: 0, tablet: 5, laptop: 5 },
                  mb: 10,
                  textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                  fontSize: "2.5rem",
                }}
              >
                User Profile
              </Typography>

              <div className="flex flex-col justify-center items-center mt-0">
                <Button disabled
                  variant="contained"
                  sx={{
                    backgroundColor: "custom.main",
                    color: "custom.contrastText",
                    width: { mobile: "90%", tablet: "40%", laptop: "40%" },
                    height: { mobile: "60px", tablet: "50px", laptop: "50px" },
                  }}
                  type="submit"
                >
                  {a? a.user.Username : "kk"}
                </Button>
              </div>
              <div className="flex flex-col justify-center items-center mt-10">
                <Button disabled 
                  variant="contained"
                  sx={{
                    backgroundColor: "custom.main",
                    color: "custom.contrastText",
                    width: { mobile: "90%", tablet: "40%", laptop: "40%" },
                    height: { mobile: "60px", tablet: "50px", laptop: "50px" },
                  }}
                >
                  {a? a.user.Phone : "kk"}
                </Button>
              </div>
              <div className="flex flex-col justify-center items-center mt-20">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "custom.main",
                    color: "custom.contrastText",
                    width: { mobile: "90%", tablet: "40%", laptop: "40%" },
                    height: { mobile: "55px", tablet: "50px", laptop: "50px" },
                  }}
                  type="submit"
                >
                  Rewards
                </Button>
              </div>
              <div className="flex flex-col justify-center items-center mt-10">
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "custom.main",
                    color: "custom.contrastText",
                    width: { mobile: "90%", tablet: "40%", laptop: "40%" },
                    height: { mobile: "55px", tablet: "50px", laptop: "50px" },
                  }}
                  type="submit" 
                >
                  Report History
                </Button>
              </div>  
              <div className='flex flex-row justify-between items-center'>
                <Typography
                    variant="h5"
                    color="primary.contrastText"
                    to="/Welcome"
                    sx={{
                      fontStyle: "italic",
                      fontSize: "1rem",
                      textAlign: "center",
                      textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                      margin: "auto",
                      mt: 10,
                      borderRadius: "10px",
                      width: "50%",
                      height: "50px",
                      border: "1px solid white",
                      fontWeight: "bold",
                      textDecoration: "none",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",

                    }}
                  >
                    Log Out
                  </Typography>
                </div>
            </Box>
          </Grid>
        </Grid>
      </Theme>
    </>
  )
}
