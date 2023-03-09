import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import TextSendMsg from "components/common/TextSendMsg";
import UserCard from "components/UserCard";
import MessageBox from "components/common/MessageBox";
import GroupCard from "components/GroupCard";
import Modal from "components/common/Modal";
import UserCombobox from "components/UserCombobox";
import groupApi from "api/groupApi";

const ChatBox = ({ socket, isPrivate }) => {
  const messageEndRef = useRef();
  const currentReceiver = useSelector(state => state.currentReceiver.data);
  const currentGroup = useSelector(state => state.groups.currentGroup);
  const listMessages = useSelector(state => state.messages.data);
  const listMessageGroup = useSelector(state => state.messageGroup.data);
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState({})

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [listMessages, listMessageGroup]);

  const onClickAddUser = () => {
    console.log("onClickAddUser")
    setIsOpenModal(true);
  }

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const onSelectUser = (user) => {
    setSelectedUser(user)
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      const data = {
        groupId: currentGroup._id,
        userIds: [selectedUser._id]
      };
      const response = await groupApi.addUserToGroup(data)
      if (response.error_code === 0) {
        toast.success("Add member successfully")
      }
    } catch (err) { 
      toast.error("Cannot add member")
    }
    handleCloseModal();
  }

  return (
    <>
      {isPrivate ? (
        <UserCard user={currentReceiver} statusPosition="bottom" statusMsg hasMedia className="mt-0" />
      ) : (
        <GroupCard group={currentGroup} hasAction clickAction={onClickAddUser} />
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
      <Modal isOpen={isOpenModal} handleOnClose={handleCloseModal} titleModal="Add member">
        <div>
          <form onSubmit={onSubmit}>
            <UserCombobox onSelectUser={onSelectUser} inputClassName="border-user-search" notMe />
            <div className="mt-2 flex justify-end items-center w-80 ml-auto">
              <button className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary ml-2">
                Add
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ChatBox;
