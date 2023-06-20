import * as React from "react";
import {
  styled,
  alpha,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Container from "@mui/material/Container";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import AdbIcon from "@mui/icons-material/Adb";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListSubheader from "@mui/material/ListSubheader";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Rating from "@mui/material/Rating";
import Slide from "@mui/material/Slide";
import Library from "./components/Library/Library";
import logo from "./logo.svg";
import "./App.css";
import SideNav from "./components/SideNav/SideNav";
import BookSearch from "./components/BookSearch/BookSearch";
import Setting from "./components/SettingIcon/Setting";
import Dropdown from "./components/Dropdown/Dropdown";

const label = { inputProps: { "aria-label": "Color switch demo" } };

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

export default function App() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const [filter, setFilter] = React.useState('');


  console.log(filter)

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <div className="App">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar className="AppBar" position="fixed">
            <Toolbar>
              <SideNav />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, letterSpacing: "0.009em" }}
              >
                CodeBooker
              </Typography>

              <BookSearch filter={filter} setFilter={setFilter}/>
              <NotificationsIcon size="small" />
              <Switch
                sx={{ marginLeft: "0.5rem" }}
                size="small"
                {...label}
                inputProps={{ "aria-label": "controlled" }}
                checked={isDarkMode}
                onChange={handleToggleDarkMode}
              />
              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
              <Dropdown />
              {/* <SettingsIcon style={{marginLeft:20}} /> */}
              {/* <Setting /> */}
            </Toolbar>
          </AppBar>
        </Box>
        <Library filter={filter}/>
      </div>
    </ThemeProvider>
  );
}
