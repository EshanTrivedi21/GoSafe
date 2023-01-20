import React from 'react';
import { Theme } from "../assets/theme.js";
import { Grid, Box } from "@mui/material";

export default function Profile() {
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
                py: { mobile: 20, tablet: 5, laptop: 5 },
                transform: "translateY(-50%)",
                overflow: "hidden",
              }}
            >
              
            </Box>
          </Grid>
        </Grid>
      </Theme>
    </>
  )
}
