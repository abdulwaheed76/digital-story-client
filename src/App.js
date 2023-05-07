// import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./views/register";
import Login from "./views/login";
import { store } from "./store/store";
import { Provider } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import Stories from "./views/stories";
import { ThemeProvider } from "@emotion/react";
import theme from "./components/global/theme";
import SingleStory from "./views/singleStory";
import NewStory from "./views/newStory";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {console.log(process.env.REACT_APP_BUCKET_NAME)}
        <ThemeProvider theme={theme}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/addStory" element={<NewStory />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/stories/:id" element={<SingleStory />} />
            </Route>
            
            <Route path="/" element={<Navigate to="/user/register" />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/login" element={<Login />} />
          </Routes>
        </ThemeProvider>
      </div>
    </Provider>
  );
}

export default App;
