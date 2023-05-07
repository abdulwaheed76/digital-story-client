import React, { useState } from "react";
import {
  Box,
  Container,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

export default function PreviewStory({
  title = "Title",
  image,
  text = "sjakjkj",
  video,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };
  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {title}
          </Typography>
          <img src="https://res.cloudinary.com/demo/image/upload/w_100,h_100,c_thumb,g_faces/couple.jpg" height='auto'></img>

          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
          {/* <Box mt={2}>
            <video width="400" controls>
              <source src="https://www.youtube.com/watch?v=i6Wb66XluK0" type="video/*" />
            </video>
          </Box> 
          */}
        </CardContent>
        <Button color="secondary">Post</Button>
      </Card>
     
    </Container>
  );
}
