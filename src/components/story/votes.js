import React, { useEffect, useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { getVote, makeVote } from "../../store/voteSlice";

export default function Vote({ storyId }) {
  const { successGet, loading, votes, voted } = useSelector(
    (state) => state.vote
  );

  const dispatch = useDispatch();

  const [up, setUp] = useState("");
  const [down, setDown] = useState("");
  const { userId } = JSON.parse(localStorage.getItem("userInfo"));
  const handleVote = (v) => {
    if (v == "up") {
      dispatch(makeVote({ storyId, userId, upVote: true, downVote: false }));
      if (votes.userVote[0].upVote === true) {
        setUp("");
        setDown("");
      } else {
        setUp("secondary");
        setDown("");
      }
    }
    if (v == "down") {
      dispatch(makeVote({ storyId, userId, upVote: false, downVote: true }));
      if (votes.userVote[0].downVote === true) {
        setDown("");
        setUp("");
      } else {
        setDown("secondary");
        setUp("");
      }
    }
  };


  useEffect(() => {
    dispatch(getVote({ storyId, userId }));
  }, [voted]);

  return (
    <>
      <IconButton size="small" color={up} onClick={() => handleVote("up")}>
        <ThumbUpIcon />
      </IconButton>
      {votes.upVote}
      {/* {console.log("++++++ Votes +++++", votes)} */}
      <IconButton size="small" color={down} onClick={() => handleVote("down")}>
        <ThumbDownIcon />
      </IconButton>
      {votes.downVote}
    </>
  );
}
