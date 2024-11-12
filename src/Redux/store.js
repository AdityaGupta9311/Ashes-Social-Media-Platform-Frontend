import{legacy_createStore,combineReducers,applyMiddleware} from "redux";
import { thunk } from "redux-thunk";
import { postReducer } from "./Post/post.reducer";
import { messageReducer } from "./Message/message.reducer";
import { authReducer } from "./Auth/auth.reducer";

const rootReducers = combineReducers({
auth:authReducer,
post:postReducer,
message:messageReducer,
})

export const store = legacy_createStore( rootReducers,applyMiddleware(thunk))