import { Avatar, Card, CardHeader } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/auth.action";
import { createChat } from "../../Redux/Message/message.action";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);

  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    console.log("Search User...---",auth.searchUser);
    dispatch(searchUser(username));
  };

  const handleClick = (id) => {
    dispatch(createChat({ userId: id }));
  };
  return (
    <div>
      <div className="py-5 relative">
        <input
          className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder="Search user.."
          onChange={handleSearchUser}
          type="text"
        />
        {username &&
          auth.searchUser.map((item) => (
            <Card
              key={item.id}
              className="absolute w-full z-10 top-[4.5rem] cursor-pointer"
            >
              <CardHeader
                onClick={() => {
                  handleClick(item.id);
                  setUsername("");
                }}
                avatar={
                  <Avatar src="https://lumiere-a.akamaihd.net/v1/images/p_loki_disneyplusoriginals_poster_eb340c6d.jpeg" />
                }
                title={item.firstname + " " + item.lastname}
                subheader={
                  item.firstname.toLowerCase() +
                  "_" +
                  item.lastname.toLowerCase()
                }
              />
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SearchUser;
