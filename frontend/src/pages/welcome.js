import React from "react";
import { Theme } from "../assets/theme.js";
import { Grid, Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import homepagesvg from "../assets/homepage.svg";
import { useNavigate } from "react-router-dom";
import { apiCheckLogin } from "../utilities/apiCall";

const Welcome = () => {
  const navigate = useNavigate();
  let [a, setA] = React.useState(null);
  React.useEffect(() => {
    if (!a) {
      apiCheckLogin(setA);
    } else {
      if (!a.err) navigate("/");
    }
  }, [a]);
  return (
    <Theme>
      <Grid container justifyContent="center">
        <Grid item mobile={12} tablet={8.5} laptop={4}>
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
              py: { mobile: 14, tablet: 5, laptop: 5 },
              transform: "translateY(-50%)",
              overflow: "hidden",
            }}
          >
            <div className="flex flex-col justify-center items-center ">
              <img
                src={homepagesvg}
                alt="illustration"
                className=" w-[70vw] sm:hidden"
              />
            </div>
            <Typography
              variant="h3"
              component="h2"
              color="primary.contrastText"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                mt: { mobile: 12.5, tablet: 5, laptop: 5 },
                mb: 2,
                textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
              }}
            >
              GOSAFE
            </Typography>
            <Typography
              variant="h6"
              color="primary.contrastText"
              sx={{
                fontStyle: "italic",
                letterSpacing: "0.1rem",
                textAlign: "center",
                textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                mb: 7.5,
              }}
            >
              “We are here for you”
            </Typography>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-5 mt-10">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "custom.main",
                  color: "custom.contrastText",
                  width: { mobile: "85%", tablet: "40%", laptop: "40%" },
                }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "rgb(255, 255, 255, 0.1)",
                  borderColor: "custom.main",
                  color: "custom.main",
                  width: { mobile: "85%", tablet: "40%", laptop: "40%" },
                }}
                onClick={() => navigate("/signup")}
              >
                Signup
              </Button>
            </div>
          </Box>
        </Grid>
      </Grid>
    </Theme>
  );
};

export default Welcome;
