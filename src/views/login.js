import React from "react";
import NavBar from "../components/global/navBar";
import LoginUser from "../components/auth/login";
import theme from "../components/global/theme";
import { ThemeProvider } from "@emotion/react";
import AppFooter from "../components/global/footer";
export default function Login() {
  return (
    <>
    <ThemeProvider theme={theme}>
      <NavBar />
      <LoginUser />
      <AppFooter/>
      </ThemeProvider>
    </>
  );
}
