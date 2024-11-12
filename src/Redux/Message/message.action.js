import { api } from "../../Config/api";
import * as actionType from "./message.actionType";

export const createMessage = (reqData) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_MESSAGE_REQUEST });
  try {
    const { data } = await api.post(
      `/api/messages/chat/${reqData.message.chatId}`,
      reqData.message
    );
    reqData.sendMessageToServer(data)
    console.log("created message", data);
    dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    console.log("CATCH ERROR", error);
    dispatch({ type: actionType.CREATE_MESSAGE_FAILUER, payload: error });
  }
};

export const createChat = (chat) => async (dispatch) => {
  dispatch({ type: actionType.CREATE_CHAT_REQUEST });
  try {
    const { data } = await api.post("/api/chats", chat);
    console.log("created chats", data);
    dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data });
  } catch (error) {
    console.log("CATCH ERROR", error);
    dispatch({ type: actionType.CREATE_CHAT_FAILUER, payload: error });
  }
};

export const getAllChats = () => async (dispatch) => {
  dispatch({ type: actionType.GET_ALL_CHAT_REQUEST });
  try {
    const { data } = await api.get(`/api/chats`);
    console.log("GET ALL CHATS", data);
    dispatch({ type: actionType.GET_ALL_CHAT_SUCCESS, payload: data });
  } catch (error) {
    console.log("CATCH ERROR", error);
    dispatch({ type: actionType.GET_ALL_CHAT_FAILUER, payload: error });
  }
};
