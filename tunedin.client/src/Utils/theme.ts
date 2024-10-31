import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // main: "#8d1094", // Purple
      // light: "#a51aa6",
      // dark: "#6c0e6f",
      // main: "#1e88e5", // Blue
      // light: "#4fb3f6",
      // dark: "#005cb2",
      main: "#c3423f", // Red
      light: "#d24e4b",
      dark: "#b13a37",
    },
    secondary: {
      main: "#0d1421", //#0d1421 second, //#0D1821 first
      light: "#1a2630",
      dark: "#000000",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            borderRadius: 0,
          },
        },
      },
    },
  },
});

export default theme;
