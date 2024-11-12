import { Avatar, Card, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import StoryCircle from "../StoryCircle/StoryCircle";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArticleIcon from "@mui/icons-material/Article";
import PostCard from "../Post/PostCard";
import CreatePostModal from "../CreatePost/CreatePostModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostAction } from "../../Redux/Post/post.action";

const story = [12, 344, 332, 33, 33];
// const posts = [12, 344, 332, 33, 33];
const MiddlePart = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((store) => store);
  console.log("post store", post);
  const [openCreatePostModel, setOpenCreatePostModel] = useState(false);
  const handleCloseCreateCloseModal = () => setOpenCreatePostModel(false);

  const handleOpenCreatePostModel = () => {
    setOpenCreatePostModel(true);
    console.log("open post model...");
  };
  useEffect(() => {
    dispatch(getAllPostAction());
  }, [post.newComment]);
  return (
    <div className="px-20">
      <section className="flex items-center p-5 rounded-b-md">
        <div className="flex flex-col items-center mr-4 cursor-pointer">
          <Avatar sx={{ width: "5rem", height: "5rem" }}>
            <AddIcon />
          </Avatar>
          <p>New</p>
        </div>
        {story.map((item) => (
          <StoryCircle />
        ))}
      </section>

      <div className="p-5 mt-5">
        <div className="flex justify-between">
          <Avatar />
          <input
            onClick={handleOpenCreatePostModel}
            readOnly
            className="outline-none w-[90%] rounded-full px-0 bg-transparent border-[#3b4054] border"
            type="text"
          />
        </div>
        <div className="flex justify-center space-x-9 mt-5">
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ImageIcon />
            </IconButton>
            <span>Media</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <VideocamIcon />
            </IconButton>
            <span>Video</span>
          </div>
          <div className="flex items-center">
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ArticleIcon />
            </IconButton>
            <span> Write Article</span>
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-5">
        {post.posts.map((item) => (
          <PostCard item={item} />
        ))}
      </div>
      <div>
        <CreatePostModal
          handleClose={handleCloseCreateCloseModal}
          open={openCreatePostModel}
        />
      </div>
    </div>
  );
};

export default MiddlePart;
