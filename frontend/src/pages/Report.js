import React from "react";
import { Box, Grid, Typography, Stack, Paper } from "@mui/material";
import { Theme } from "../assets/theme.js";
import History from "./History.js";
import { styled } from "@mui/material/styles";

const Report = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    padding: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  }));
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
                p: 2.5,
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
                  mt: { mobile: 5, tablet: 5, laptop: 5 },
                  mb: 7.5,
                  textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                  fontSize: "2.5rem",
                }}
              >
                Report History
              </Typography>
              <h1 style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "left",
                textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                fontSize: "1.5rem",
                marginBottom: "1rem"
              }}>January, 2023</h1>
              <Stack spacing={2}>
                <Item className="!bg-[#165C3F] !drop-shadow-xl !border">
                  <History image="homepage.svg" location="Thakur Village, Kandivali"/>
                </Item>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Theme>
    </>
  );
};

export default Report;
