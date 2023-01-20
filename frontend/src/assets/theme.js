import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 500,
      laptop: 1024,
      desktop: 1200,
    },
  },
  palette: {
    primary: {
      main: "#13724A",
      contrastText: "#fff",
    },
    secondary: {
      main: "#165C3F",
      contrastText: "#fff",
    },
    custom: {
      main: "#fff",
      contrastText: "#000",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          fontSize: "1.25rem",
          fontWeight: "bold",
          textTransform: "none",
          letterSpacing: "0.1rem",
          borderRadius: "10px",
        },
        '&:hover': {
          backgroundColor: '#fff',
          color: '#fff',
      },
      }
    }
  },
});

export function Theme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
