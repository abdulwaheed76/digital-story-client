import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
// import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, Container, Stack } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import IconButton from "@mui/material/IconButton";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useSelector, useDispatch } from "react-redux";
import { getStory } from "../../store/story/storyAction";
import CircularProgress from "@mui/material/CircularProgress";
import PollIcon from "@mui/icons-material/Poll";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export function HTMLConverter(props) {
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.innerHTML = props.htmlString;
  }, [props.htmlString]);

  return <div ref={divRef} />;
}
export default function AllStories() {
  const { loading, success, error, stories } = useSelector(
    (state) => state.story
  );

  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStory());
  }, []);
  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 7, flexGrow: 1 }}>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            All Stories
          </Typography>
        </React.Fragment>
      </Box>
      <Box sx={{ mt: 7, mb: 12, flexGrow: 1 }}>
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
        {!loading && stories.length > 0 && (
          <Grid
            container="md"
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {stories.map((story, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <Card sx={{ maxWidth: 445, mt: 7 }}>
                  <CardMedia
                    sx={{ height: 350 }}
                    image={story.imageUrl}
                    title={story.title}
                  />
                  {console.log(story.imageUrl)}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {story.title}
                    </Typography>
                    <Typography sx={{height:"40px"}} variant="body2" color="text.secondary">
                      <HTMLConverter
                        htmlString={
                          story.description.length 
                        }
                      />
                    </Typography>
                  </CardContent>
                  <CardActions
                    sx={{
                      width: "95%",
                      display: "flex",
                      justifyContent: "space-between",
                      p: 0,
                      m: 1,
                    }}
                  >
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => navigateTo(`/stories/${story._id}`)}
                    >
                      More ...
                    </Button>
                    <Box>
                      {story.upVote + story.downVote > 0 && (
                        <Tooltip title="Votes" color="secondary">
                          <IconButton size="small" color="secondary">
                            {story.upVote + story.downVote}
                            <PollIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {story.upVote + story.downVote == 0 && (
                        <Tooltip title="Votes">
                          <IconButton size="small">
                            <PollIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
}
