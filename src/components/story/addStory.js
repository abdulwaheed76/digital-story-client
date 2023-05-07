import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextEditor from "./textEditor";
import Typography from "@mui/material/Typography";
import { TextField, Grid, MenuItem, Button, Paper } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { postStory } from "../../store/story/storyAction";
import AWS from "aws-sdk";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FileUpload from "react-mui-fileuploader";
const S3_BUCKET = process.env.REACT_APP_BUCKET_NAME;
const REGION = "us-east-2";
AWS.config.update({
  accessKeyId: process.env.REACT_APP_ACCESSKEY,
  secretAccessKey: process.env.REACT_APP_SECRETKEY,
});
console.log(process.env.REACT_APP_ACCESSKEY);
console.log(process.env.REACT_APP_SECRETKEY);
const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});
export default function AddStory() {
  const { loading, successPost, error, stories } = useSelector(
    (state) => state.story
  );
  const navigateTo = useNavigate();

  const { userId } = JSON.parse(localStorage.getItem("userInfo"));
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showButton,setShowButton] = useState(false)
  const handleFileInput = (files) => {
    setSelectedFile(files);
  };

  const uploadFile = (file) => {
    const params = {
      ACL: "public-read",
      Body: selectedFile[0],
      Bucket: S3_BUCKET,
      Key: selectedFile[0].name,
    };
    toast("FIle Uploading");
    console.log(process.env.REACT_APP_BUCKET_NAME,S3_BUCKET)
    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        // toast(Math.round((evt.loaded / evt.total) * 100));
        console.log(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        console.log(err);
        if (err) {
          console.log(err);
          toast("Error Uploaded");
        } else {
          toast("File Uploaded");
          setSelectedFile([]);
          setImageUrl(
            "https://digitalstory-bucket.s3.amazonaws.com/" +
              selectedFile[0].name
          );
        }
      });
  };

  const storySchema = useFormik({
    initialValues: {
      title: "",
      visibility: "",
    },
    onSubmit: (value) => {
      console.log(value);
      value.description = description;
      value.imageUrl = imageUrl;
      value.userId = userId;
      dispatch(postStory(value));
      toast("Your story uploaded");
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      visibility: Yup.string().oneOf(["public", "private"]).required(),
    }),
  });
  useEffect(() => {
    if (successPost) {
      navigateTo("/stories");
    }
  }, [successPost]);

  return (
    <Container maxWidth="md">
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
              Create your story
            </Typography>
          </React.Fragment>
          <form onSubmit={storySchema.handleSubmit}>
            <Box sx={{ height: "50vh" }}>
              <TextEditor
                description={description}
                setDescription={setDescription}
              />
            </Box>
            <Box>
              <Grid
                container
                rowSpacing={2}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Story Title</Typography>
                  <TextField
                    id="title"
                    variant="outlined"
                    value={storySchema.values.title}
                    onChange={storySchema.handleChange}
                    error={
                      storySchema.touched.title &&
                      Boolean(storySchema.errors.title)
                    }
                    helperText={
                      storySchema.touched.title && storySchema.errors.title
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Visibility</Typography>
                  <TextField
                    id="visibility"
                    name="visibility"
                    value={storySchema.values.visibility}
                    onChange={storySchema.handleChange}
                    error={
                      storySchema.touched.visibility &&
                      Boolean(storySchema.errors.visibility)
                    }
                    helperText={
                      storySchema.touched.visibility &&
                      storySchema.errors.visibility
                    }
                    fullWidth
                    select
                  >
                    <MenuItem key={"public"} value="public">
                      Public
                    </MenuItem>
                    <MenuItem key={"private"} value="private">
                      Private
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Upload Files</Typography>
                  <FileUpload
                    multiFile={false}
                    onFilesChange={handleFileInput}
                    title="Files"
                    onContextReady={() => {setShowButton(!showButton)}}
                    buttonRemoveLabel="Remove"
                    acceptedType={"image/*"}
                  />{" "}
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                mt: 1,
              }}
            >
              {showButton && (
                <Button
                  sx={{
                    backgroundColor: "#ff3366",
                    "&:hover": { backgroundColor: "#ff3366" },
                  }}
                  size="large"
                  color="primary"
                  onClick={uploadFile}
                >
                  Upload Files
                </Button>
              )}
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                mt: 6,
              }}
            >
              <Button
                sx={{
                  backgroundColor: "#ff3366",
                  // color: "#fff ",
                  "&:hover": { backgroundColor: "#ff3366" },
                  height: "60px",
                  width: "350px",
                }}
                size="large"
                color="primary"
                type="submit"
              >
                CREATE
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
      <ToastContainer />
    </Container>
  );
}
