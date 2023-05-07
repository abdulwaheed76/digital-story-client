import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserDetailsQuery } from "../../store/auth/authService";
import { logout, setCredentials } from "../../store/auth/authSlice";
import { createTheme } from "@mui/material/styles";
import { Link } from "@mui/material";

export default function NavBar() {
  const navigateTo = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    pollingInterval: 900000, // 15mins
  });
  const token = localStorage.getItem("userToken");
  useEffect(() => {
    if (data) dispatch(setCredentials(data));
  }, [data, dispatch, isFetching]);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#28282A",
      },
      secondary: {
        main: "#E62958",
      },
    },
    typography: {
      fontFamily: "Raleway, Arial",
    },
  });
  const handleLogout = () => {
    dispatch(logout());
    // navigateTo("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              > 
                <MenuIcon />
              </IconButton> */}
          <Typography
            variant="h6"
            color="secondary"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            News
          </Typography>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {token ? (
              <>
                <Button color="inherit" onClick={() => navigateTo("/stories")}>
                  Stories
                </Button>
                <Button color="inherit" onClick={() => navigateTo("/addStory")}>
                  Create Story
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="secondary"
                  variant="h6"
                  onClick={() => navigateTo("/user/register")}
                >
                  Register
                </Button>
                <Button
                  color="secondary"
                  variant="h6"
                  onClick={() => navigateTo("/user/login")}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
