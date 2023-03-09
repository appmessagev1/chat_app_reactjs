import React, { useState } from 'react'
import { FiSend } from "react-icons/fi";
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { addMessage } from 'redux/slices/messageSlice';
import { addMessageGroup } from 'redux/slices/messageGroupSlice';
import TextInput from 'components/common/TextInput';
import messageApi from "api/messageApi"

const TextSendMsg = ({ socket, isPrivate }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const currentConversation = useSelector(state => state.conversations.currentConversation);
  const currentReceiver = useSelector(state => state.currentReceiver.data);
  const currentGroup = useSelector(state => state.groups.currentGroup);
  const sender = useSelector(state => state.user.data);

  const messageChange = message => {
    setMessage(message);
  };

  const sendMessage = async () => {
    if (isPrivate) {
      try {
        const data = {
          content: message,
          receiver: currentReceiver.socketId,
          senderId: sender._id,
          conversationId: currentConversation._id,
          senderName: sender.name
        };
        await socket.emit("send_message", data);
        const action = addMessage(data);
        dispatch(action);
        setMessage("");
        const dataPost = {
          content: message,
          senderId: sender._id,
          conversationId: currentConversation._id,
          senderName: sender.name,
        };
        const response = await messageApi.postMessageInConversation(dataPost);
      } catch (error) {
        toast.error("Send message failed");
      }
    } else {
      try {
        const data = {
          content: message,
          groupId: currentGroup._id,
          senderId: sender._id,
          senderName: sender.name,
        }
        await socket.emit("send_message_group", data);
        const action = addMessageGroup(data);
        dispatch(action);
        setMessage("");
        const response = await messageApi.postMessageInGroup(data);
      } catch (error) {
        toast.error("Send message failed");
      }
    }
  };

  return (
    <>
      <TextInput value={message} enter={sendMessage} inputChange={messageChange} placeholder="Type your message..." className="flex-1" />
      <div onClick={sendMessage} className="w-10 h-10 flex items-center justify-center rounded-full cursor-pointer ml-2">
        <FiSend size={24} />
      </div>
    </>
  );
};

export default TextSendMsg