import { ThemeProvider } from "@emotion/react";
import React from "react";
import AppFooter from "../components/global/footer";
import NavBar from "../components/global/navBar";
import theme from "../components/global/theme";
import AddStory from "../components/story/addStory";

export default function NewStory() {
  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <AddStory />
      <AppFooter />
    </ThemeProvider>
  );
}
