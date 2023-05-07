import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SendIcon from "@mui/icons-material/Send";
import {
  Paper,
  CardContent,
  Grid,
  Stack,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getComment, makeComment } from "../../store/commentSlice";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Vote from "./votes";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));


export function timeSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  return Math.floor(seconds) + " seconds ago";
}
export default function Comment({ storyId }) {
  const { comments, success, loading, commentAdded } = useSelector(
    (state) => state.comment
  );
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [expanded, setExpanded] = useState(false);
  const { userId } = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(userId)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleComment = () => {
    dispatch(makeComment({ comment, storyId, userId }));
  };
  useEffect(() => {
    dispatch(getComment(storyId));
  }, [commentAdded]);

  return (
    <>
      <CardActions disableSpacing>
        <Vote storyId={storyId} />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          m: 1,
          display: "flex",
          alignItems: "center",
          maxWidth: 800,
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={
            "https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_faces/couple.jpg"
          }
        />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="comment here"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {console.log(comments, comments.length)}
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          disabled={comment.length == 0}
          onClick={handleComment}
        >
          <SendIcon />
        </IconButton>
      </Paper>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
        {success && comments.length && (
          <CardContent>
            {comments.map((c, index) => (
              <Grid container wrap="nowrap" key={index} spacing={2}>
                <Grid item>
                <Avatar sx={{ bgcolor: "#28282a" }}>{c.userName[0]}</Avatar>
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                  <h4 style={{ margin: 0, textAlign: "left" }}>
                    {c.userName}
                  </h4>
                  <p style={{ textAlign: "left" }}>{c.comment}</p>
                  <p style={{ textAlign: "left", color: "gray" }}>
                    posted {timeSince(c.createdAt)}
                  </p>
                </Grid>
              </Grid>
              // <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
            ))}
          </CardContent>
        )}
        {!loading && !comments.length && (
          <CardContent>
            <Stack
              sx={{ color: "grey.500" }}
              spacing={2}
              direction="flex"
              justifyContent="center"
            >
              <Typography>No Comments</Typography>
            </Stack>
          </CardContent>
        )}
      </Collapse>
    </>
  );
}
