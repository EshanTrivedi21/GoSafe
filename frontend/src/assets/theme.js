import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
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
    }
  },
});

export function Theme(props) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}