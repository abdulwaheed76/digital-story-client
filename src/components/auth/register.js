import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
// import { useNavigate } from "react-router-dom";
import { Button, Container, Paper, Typography, Link } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../store/auth/authAction";
import Stack from "@mui/material/Stack";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
  const navigateTo = useNavigate();
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const userSchema = useFormik({
    initialValues: {
      name: "",
      userName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      dispatch(registerUser(values));
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      userName: Yup.string().required(),
      email: Yup.string().email("Invalid Email Address").required(),
      password: Yup.string()
        .required()
        .min(8, "Password at leat 8 character long"),
    }),
  });
  useEffect(() => {
    if (success) {
      navigateTo("/stories");
    }
  }, [loading, error, success]);
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 7, mb: 12 }}>
        <Paper
          background="light"
          sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 } }}
        >
          <React.Fragment>
            <Typography
              variant="h3"
              gutterBottom
              marked="center"
              align="center"
            >
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="/user/login" underline="always">
                Already have an account?
              </Link>
            </Typography>
          </React.Fragment>
          <Box sx={{ mt: 6 }}>
            <Grid container>
              <form onSubmit={userSchema.handleSubmit}>
                <TextField
                  sx={{ pb: 3 }}
                  id="name"
                  label="Name"
                  variant="outlined"
                  value={userSchema.values.name}
                  onChange={userSchema.handleChange}
                  error={
                    userSchema.touched.name && Boolean(userSchema.errors.name)
                  }
                  helperText={userSchema.touched.name && userSchema.errors.name}
                  fullWidth
                  // required
                />
                <TextField
                  sx={{ pb: 3 }}
                  id="userName"
                  label="User Name"
                  variant="outlined"
                  value={userSchema.values.userName}
                  onChange={userSchema.handleChange}
                  error={
                    userSchema.touched.userName &&
                    Boolean(userSchema.errors.userName)
                  }
                  helperText={
                    userSchema.touched.userName && userSchema.errors.userName
                  }
                  fullWidth
                  // required
                />
                <TextField
                  sx={{ pb: 3 }}
                  id="email"
                  label="Email"
                  variant="outlined"
                  value={userSchema.values.email}
                  onChange={userSchema.handleChange}
                  error={
                    userSchema.touched.email && Boolean(userSchema.errors.email)
                  }
                  helperText={
                    userSchema.touched.email && userSchema.errors.email
                  }
                  fullWidth
                  // required
                />
                <TextField
                  sx={{ pb: 3 }}
                  id="password"
                  label="Password"
                  variant="outlined"
                  type={"password"}
                  value={userSchema.values.password}
                  onChange={userSchema.handleChange}
                  error={
                    userSchema.touched.password &&
                    Boolean(userSchema.errors.password)
                  }
                  helperText={
                    userSchema.touched.password && userSchema.errors.password
                  }
                  fullWidth
                  // required
                />
                <Typography variant="body2" align="center" color={"red"}>
                  {error}&nbsp;
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: "#ff3366",
                      // color: "#fff ",
                      "&:hover": { backgroundColor: "#ff3366" },
                      height: "60px",
                      width: "200px",
                    }}
                    size="large"
                    color="primary"
                    type="submit"
                  >
                    SIGN UP
                  </Button>
                </Box>
              </form>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
}
