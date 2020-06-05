import {
  teal,
  deepOrange,
  red,
  orange,
  indigo,
  green
} from "@material-ui/core/colors";

const theme = {
  palette: {
    type: "dark",
    primary: {
      main: teal[200]
    },
    secondary: {
      main: deepOrange[300]
    },
    error: {
      main: red[500]
    },
    warning: {
      main: orange[500]
    },
    info: {
      main: indigo[500]
    },
    success: {
      main: green[500]
    }
  },
  overrides: {
    MuiBottomNavigation: {
      root: {
        position: "fixed",
        width: "100vw",
        bottom: 0,
        boxShadow:
          "0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)"
      }
    },
    MuiSnackbarContent: {
      root: {
        color: "#fff"
      }
    },
    MuiPopover: {
      paper: {
        boxShadow:
          "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
      }
    }
  }
};
export default theme;
