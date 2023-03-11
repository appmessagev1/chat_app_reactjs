import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import TextSendMsg from "components/common/TextSendMsg";
import UserCard from "components/UserCard";
import MessageBox from "components/common/MessageBox";
import GroupCard from "components/GroupCard";

const ChatBox = ({ socket, isPrivate }) => {
  const messageEndRef = useRef();
  const currentReceiver = useSelector(state => state.currentReceiver.data);
  const currentGroup = useSelector(state => state.groups.currentGroup);
  const listMessages = useSelector(state => state.messages.data);
  const listMessageGroup = useSelector(state => state.messageGroup.data);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [listMessages, listMessageGroup]);

  return (
    <>
      {isPrivate ? (
        <UserCard user={currentReceiver} statusPosition="bottom" statusMsg hasMedia className="mt-0" />
      ) : (
        <GroupCard group={currentGroup} />
      )}
      <div className="overflow-y-scroll scrollbar-hidden pt-5 flex-1 pb-2">
        {isPrivate ? (
          <>
            {listMessages.map((message, index) => {
              return <MessageBox key={index} content={message.content} senderId={message.senderId} senderName={message.senderName} isPrivate={isPrivate} />;
            })}
          </>
        ) : (
          <>
            {listMessageGroup.map((message, index) => {
              return <MessageBox key={index} content={message.content} senderId={message.senderId} senderName={message.senderName} isPrivate={isPrivate} />;
            })}
          </>
        )}
        <div ref={messageEndRef}></div>
      </div>
      <div className="chat-input box border flex items-center px-5 py-4">
        <TextSendMsg socket={socket} isPrivate={isPrivate} />
      </div>
    </>
  );
};

export default ChatBox;
