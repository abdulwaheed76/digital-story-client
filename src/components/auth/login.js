import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
// import { useNavigate } from "react-router-dom";
import { Button, Container, Paper, Typography, Link } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../store/auth/authAction";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
export default function LoginUser() {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const userSchema = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      //   alert(JSON.stringify(values, null, 2));
      dispatch(loginUser(values));
    },
    validationSchema: Yup.object({
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
              Sign In
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="/user/register" underline="always">
                Don't have an account?
              </Link>
            </Typography>
          </React.Fragment>
          <Box sx={{ mt: 6 }}>
            <Grid container>
              <form onSubmit={userSchema.handleSubmit}>
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
                    SIGN IN
                  </Button>
                </Box>
              </form>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
