import React from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { Theme } from "../assets/theme.js";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import scratch1 from "../assets/scratch1.png";
import scratch2 from "../assets/scratch2.png";


const itemData = [
    {
      img: scratch1,
      title: 'scratch-card',
    },
    {
      img: scratch2,
      title: 'scratch-card-2',
    },
    {
      img: scratch1,
      title: 'scratch-card',
    },
    {
      img: scratch2,
      title: 'scratch-card-2',
    },
    {
      img: scratch1,
      title: 'scratch-card',
    },
    {
      img: scratch2,
      title: 'scratch-card-2',
    },
    {
      img: scratch1,
      title: 'scratch-card',
    },
    {
      img: scratch2,
      title: 'scratch-card-2',
    },
    {
      img: scratch1,
      title: 'scratch-card',
    },
    {
      img: scratch2,
      title: 'scratch-card-2',
    },
  ];
  
const Reward = () => {
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
                  mb: 1,
                  textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                  fontSize: "2.5rem",
                }}
              >
                Rewards 
              </Typography>
              <Typography
                variant="h6"
                color="primary.contrastText"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "light",
                  fontStyle: "italic",
                  textAlign: "center",
                  textShadow: "0px 5px 4px rgba(0, 0, 0, 0.36)",
                  mb: 4,
                }}
              >
                "If you work hard you should be rewarded"
              </Typography>

              <Box sx={{ width: 300, height: 600, overflowY: "scroll" }}>
                <ImageList variant="masonry" cols={2} gap={8}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Theme>
    </>
  );
};

export default Reward;
