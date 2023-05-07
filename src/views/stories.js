import { ThemeProvider } from '@emotion/react'
import React from 'react'
import AppFooter from '../components/global/footer'
import NavBar from '../components/global/navBar'
import theme from '../components/global/theme'
import AllStories from '../components/story/allStories'
export default function Stories() {
  return (
    <ThemeProvider theme={theme}>
        <NavBar/>
        <AllStories/>
        <AppFooter/>
    </ThemeProvider>
  )
}
