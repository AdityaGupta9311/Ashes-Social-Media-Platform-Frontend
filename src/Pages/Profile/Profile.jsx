import { Avatar, Box, Button, Tabs, Tab, Card } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../../Components/Post/PostCard";
import UserReelCard from "../../Components/Reels/UserReelCard";
import { useSelector } from "react-redux";
import ProfileModel from "./ProfileModel";

const tabs = [
  { value: "post", name: "Post" },
  { value: "reels", name: "Reels" },
  { value: "saved", name: "Saved" },
  // { value: "repost", name: "RePost" },
];
const posts = [1, 1, 1, 1, 1, 1];
const reels = [1, 1, 1, 1, 1, 1];
const savedPost = [1, 1, 1, 1, 1, 1];

const Profile = () => {
  // const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const handleOpenProfileModel = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState("post");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { auth } = useSelector((store) => store);
  return (
    <Card className="my-10 w-[70%] ">
      <div className="rounded-md ">
        <div className="h-[15rem]">
          {/* <img src="https://media.npr.org/assets/img/2016/10/26/cm-ss-00542_rs_20_wide-764d77b659bdc62277df63015e39041280c9c588.jpg"
            alt=""
          /> */}
        </div>
        <div className="px-5 flex justify-between items-start h-[5rem]">
          <Avatar
            className="transform -translate-y-36"
            sx={{ width: "13rem", height: "13rem" }}
            src="https://images.immediate.co.uk/production/volatile/sites/3/2020/09/loki-tv-show-ddb01c2.jpg?quality=90&resize=980,654"
          />
          {true ? (
            <Button sx={{ borderRadius: "20px" }} onClick={handleOpenProfileModel} variant="outlined">
              Edit Profile
            </Button>
          ) : (
            <Button sx={{ borderRadius: "20px" }} variant="outlined">
              Follow
            </Button>
          )}
        </div>
        <div className="p-5">
          <div className="py-1 font-bold text-xl">
            {auth.user?.firstname + " " + auth.user?.lastname}
          </div>
          <p>
            @
            {auth.user?.firstname.toLowerCase() +
              "_" +
              auth.user?.lastname.toLowerCase()}
          </p>
        </div>
        <div className="flex gap-5 items-center py-3 p-5">
          <span>45 posts</span>
          <span>100 followers</span>
          <span>45 following</span>
        </div>
        <div className="p-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
          laboriosam odio qui quo veniam sequi! Ipsa, dolores! Officiis, ipsum
          reprehenderit!
        </div>
      </div>
      <section>
        <Box
          sx={{
            width: "100%",
            marginTop: "15px",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            {tabs.map((item) => (
              <Tab value={item.value} label={item.name} />
            ))}
          </Tabs>
        </Box>
        <div className="flex justify-center">
          {value === "post" ? (
            <div className="space-y-5 w-[70%] my-10">
              {posts.map((item) => (
                <div className="border border-slate-100 rounded-md">
                  <PostCard />
                </div>
              ))}
            </div>
          ) : value === "reels" ? (
            <div className="flex flex-wrap gap-2">
              {reels.map((item) => (
                <UserReelCard />
              ))}
            </div>
          ) : value === "saved" ? (
            <div className="space-y-5 w-[70%] my-10">
              {savedPost.map((item) => (
                <div className="border border-slate-100 rounded-md">
                  <PostCard />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
      <section>
        <ProfileModel open={open} handleClose={handleClose}/>
      </section>
    </Card>
  );
};

export default Profile;