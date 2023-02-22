import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import TextSendMsg from "components/common/TextSendMsg";
import UserCard from "components/common/UserCard";
import MessageBox from "components/common/MessageBox";

const ChatBox = ({ socket }) => {
  const messageEndRef = useRef();
  const currentReceiver = useSelector(state => state.currentReceiver.data);
  
  const listMessages = useSelector(state => state.messages.data);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [listMessages]);

  return (
    <>
      <UserCard user={currentReceiver} statusPosition="bottom" statusMsg hasMedia className="mt-0" />
      <div className="overflow-y-scroll scrollbar-hidden pt-5 flex-1 pb-2">
        {listMessages.map((message, index) => {
          return <MessageBox key={index} content={message.content} senderId={message.senderId} />;
        })}
        <div ref={messageEndRef}></div>
      </div>
      <div className="chat-input box border flex items-center px-5 py-4">
        <TextSendMsg socket={socket} />
      </div>
    </>
  );
};

export default ChatBox;
