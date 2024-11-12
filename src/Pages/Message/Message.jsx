import {
  Avatar,
  Backdrop,
  CircularProgress,
  Grid,
  IconButton,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SendIcon from "@mui/icons-material/Send";
import { AddPhotoAlternateSharp } from "@mui/icons-material";
import SearchUser from "../../Components/SearchUser/SearchUser";
import UserChatCard from "./UserChatCard";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllChats } from "../../Redux/Message/message.action";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { uploadToCloudinary } from "../../utils/uploadToCloudniry";
import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Message = () => {
  const dispatch = useDispatch();
  const { message, auth } = useSelector((store) => store);
  const [currentChat, setCurrentChat] = useState();
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const stompClient = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
  };

  const handleCreateMessage = (value) => {
    if (isConnected) {
      const message = {
        chatId: currentChat?.id,
        content: value,
        image: selectedImage,
      };
      dispatch(createMessage({ message, sendMessageToServer }));
      setSelectedImage(null); // Clear selected image after sending
    } else {
      console.error("WebSocket connection is not established");
    }
  };

  useEffect(() => {
    setMessages([...messages, message.message]);
  }, [message.message]);

  useEffect(() => {
    const sock = new SockJS("http://localhost:8080/ws");
    const stomp = Stomp.over(sock);

    stomp.connect({}, () => {
      console.log("WebSocket connected.");
      setIsConnected(true);
      stompClient.current = stomp;
    }, (error) => {
      console.error("WebSocket connection error: ", error);
      setIsConnected(false);
    });

    // Cleanup on component unmount
    return () => {
      if (stompClient.current && isConnected) {
        stompClient.current.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, [isConnected]);

  const sendMessageToServer = (newMessage) => {
    if (stompClient.current && isConnected && newMessage) {
      stompClient.current.send(
        `/app/chat/${currentChat?.id.toString()}`,
        {},
        JSON.stringify(newMessage)
      );
    } else {
      console.error("WebSocket is not connected or message is invalid");
    }
  };

  const onMessageReceive = (payload) => {
    const receivedMessage = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current && currentChat) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentChat, messages]);

  useEffect(() => {
    if (stompClient.current && isConnected && currentChat) {
      const subscription = stompClient.current.subscribe(
        `/user/${currentChat?.id}/private`,
        onMessageReceive
      );

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    }
  }, [stompClient.current, isConnected, currentChat]);

  return (
    <div>
      <Grid container className="h-screen overflow-y-hidden">
        <Grid className="px-5" item xs={3}>
          <div className="flex h-full justify-between space-x-2">
            <div className="w-full">
              <div className="flex space-x-4 items-center py-5">
                <WestIcon />
                <h1 className="text-xl font-bold">Home</h1>
              </div>
              <div className="h-[83vh]">
                <div className="">
                  <SearchUser />
                </div>
                <div className="h-full space-y-4 mt-5 overflow-y-scroll hideScrollber">
                  {message.chats.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setCurrentChat(item);
                        setMessages(item.messages);
                      }}
                    >
                      <UserChatCard chat={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className="h-full" item xs={9}>
          {currentChat ? (
            <div>
              <div className="flex justify-between items-center border-1 p-5">
                <div className="flex items-center space-x-3">
                  <Avatar src="https://preview.redd.it/loki-god-of-stories-art-by-ktrew-v0-06fkpzt8ru1c1.png?auto=webp&s=f2f9a43f980177ad3f6fc0098b55158febe91d33" />
                  <p>
                    {auth.user?.id === currentChat.users[0].id
                      ? currentChat.users[1].firstname +
                        " " +
                        currentChat.users[1].lastname
                      : currentChat.users[0].firstname +
                        " " +
                        currentChat.users[0].lastname}
                  </p>
                </div>
                <div className="flex space-x-3">
                  <IconButton>
                    <AddIcCallIcon />
                  </IconButton>
                  <IconButton>
                    <VideoCallIcon />
                  </IconButton>
                </div>
              </div>
              <div
                ref={chatContainerRef}
                className="hideScrollbar overflow-y-scroll h-[82vh] px-2 space-y-5 py-5"
              >
                {messages.map((item, index) => (
                  <ChatMessage key={index} item={item} />
                ))}
              </div>
              <div className="sticky bottom-0 border-1">
                {selectedImage && (
                  <img
                    className="w-[5rem] h-[5rem] object-cover px-2"
                    src={selectedImage}
                    alt="Selected"
                  />
                )}
                <div className="py-5 flex items-center justify-center space-x-5">
                  <input
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.target.value) {
                        handleCreateMessage(e.target.value);
                        e.target.value = ""; // Clear input after sending message
                      }
                    }}
                    className="bg-transparent border border-[#3b4054] rounded-full w-[90%] py-3 px-5"
                    placeholder="Type message..."
                    type="text"
                  />
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleSelectImage}
                      className="hidden"
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <AddPhotoAlternateSharp />
                    </label>
                  </div>
                  <SendIcon onClick={() => handleCreateMessage()} />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full space-y-5 flex flex-col justify-center items-center">
              <ChatBubbleOutlineIcon sx={{ fontSize: "15rem" }} />
              <p className="text-xl font-semibold">
                Start Messages To Your Friend
              </p>
            </div>
          )}
        </Grid>
      </Grid>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Message;
