import authReducer from "redux/slices/authSlice";
import currentReceiver from "redux/slices/currentReceiverSlice";
import users from "redux/slices/usersSlice";
import messages from "redux/slices/messageSlice";
import conversations from "redux/slices/conversationSlice"
import socketOnlineUsers from "redux/slices/socketOnlineUsers"

const rootReducer = {
  user: authReducer,
  currentReceiver: currentReceiver,
  users: users,
  socketOnlineUsers: socketOnlineUsers,
  messages: messages,
  conversations: conversations,
};

export default rootReducer;