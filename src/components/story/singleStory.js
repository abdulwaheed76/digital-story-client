import { Box, Container, Paper, Typography, Grid, Card,Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector, useDispatch } from "react-redux";
import { getSingleStory } from "../../store/story/storyAction";
import { useParams } from "react-router-dom";
import Comment from "./comments";
import { HTMLConverter } from "./allStories";
import CircularProgress from "@mui/material/CircularProgress";

function formatDate(dateString) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const date = new Date(dateString);
  
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  
  return `${month} ${day}, ${year}`;
}

export default function SinglStory() {
  const { loading, stories ,success} = useSelector((state) => state.story);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getSingleStory(id));
  }, []);
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 7, mb: 12 }}>
        {loading && (
          <Stack
            sx={{ color: "grey.500" }}
            spacing={2}
            direction="flex"
            justifyContent="center"
          >
            <CircularProgress color="success" />
          </Stack>
        )}
        {console.log("single story",stories)}
        {!loading && success  && (
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
                {stories.title}
              </Typography>

          {console.log(stories)}
            </React.Fragment>
            <Box sx={{ mt: 6 }}>
              <Grid container>
                <Card sx={{ width: 1 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={stories.userName}
                    subheader={formatDate(stories.createdAt)}
                  />
                  <CardMedia
                    component="img"
                    height="350"
                    image={stories.imageUrl}
                    alt="Paella dish"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <HTMLConverter htmlString={stories.description} />
                    </Typography>
                  </CardContent>

                  <Comment storyId={id} />
                </Card>
              </Grid>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
