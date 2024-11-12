import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar, Card, CardHeader, IconButton } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const UserChatCard = ({ chat }) => {
  const { message, auth } = useSelector((store) => store);
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{
              width: "3.5rem",
              height: "3.5rem",
              fontSize: "1.5rem",
              bgcolor: "#191c29",
              color: "rgb(88,199,250)",
            }}
            src="https://lumiere-a.akamaihd.net/v1/images/p_loki_disneyplusoriginals_poster_eb340c6d.jpeg"
          />
        }
        action={
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          auth.user?.id === chat.users[0].id
            ? chat.users[1].firstname + " " + chat.users[1].lastname
            : chat.users[0].firstname + " " + chat.users[0].lastname
        }
        subheader={"new message"}
      ></CardHeader>
    </Card>
  );
};

export default UserChatCard;
