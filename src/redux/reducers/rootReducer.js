import authReducer from "redux/slices/authSlice";
import currentReceiver from "redux/slices/currentReceiverSlice";
import users from "redux/slices/usersSlice";
import messages from "redux/slices/messageSlice";
import messageGroup from "redux/slices/messageGroupSlice"
import conversations from "redux/slices/conversationSlice"
import groups from "redux/slices/groupSlice"
import socketOnlineUsers from "redux/slices/socketOnlineUsers"
import tasks from 'redux/slices/taskSlice'


const rootReducer = {
  user: authReducer,
  currentReceiver: currentReceiver,
  users: users,
  socketOnlineUsers: socketOnlineUsers,
  messages: messages,
  messageGroup: messageGroup,
  conversations: conversations,
  groups: groups,
  tasks: tasks,
};

export default rootReducer;