import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommentAction,
  likePostAction,
} from "../../Redux/Post/post.action";
import { isLikedByReqUser } from "../../utils/isLikedByReqUser";

const PostCard = ({ item }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const handleShowComment = () => setShowComments(!showComments);

  const handleCreateComment = (content) => {
    const reqData = {
      postId: item.id,
      data: {
        content,
      },
    };
    dispatch(createCommentAction(reqData));
  };
  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  };
  return (
    <div>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstname + " " + item.user.lastname}
        subheader={
          "@" +
          item.user.firstname.toLowerCase() +
          "_" +
          item.user.lastname.toLowerCase()
        }
      />
      <CardMedia
        component="img"
        height="194"
        image={item.image}
        alt="not found"
      />

      <CardActions className="flex justify-between" disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {isLikedByReqUser(auth.user.id, item) ? (
              <FavoriteIcon className="text-red-600" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton onClick={handleShowComment}>{<CommentIcon />}</IconButton>
          <IconButton>{<SendIcon />}</IconButton>
        </div>
        <div>
          <IconButton>
            {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </CardActions>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <span className="font-medium text-base">
            {item.user.firstname.toLowerCase() +
              "_" +
              item.user.lastname.toLowerCase()}
          </span>{" "}
          {item.caption}
        </Typography>
      </CardContent>
      {showComments && (
        <section>
          <div className="flex items-center space-x-5 mx-3 my-5">
            <Avatar sx={{}} />
            <input
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  handleCreateComment(e.target.value);
                  console.log("enter pressed----", e.target.value);
                }
              }}
              className="w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2"
              placeholder="Add a comment "
              type="text"
              name=""
              id=""
            />
          </div>
          <Divider />
          <div className="mx-3 space-y-2 my-5 text-xs">
            {item.comments.map((comment) => (
              <div className="flex items-center space-x-5">
                <Avatar
                  sx={{ height: "2rem", width: "2rem", fontSize: "8rem" }}
                >
                  {comment.user.firstname[0]}
                </Avatar>
                <p className="font-medium text-sm">
                  {item.user.firstname.toLowerCase() +
                    "_" +
                    item.user.lastname.toLowerCase()}
                </p>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PostCard;