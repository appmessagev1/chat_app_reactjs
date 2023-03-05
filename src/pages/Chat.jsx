import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";

import TextInput from "components/common/TextInput";
import UserCard from "components/common/UserCard";
import ChatBox from "components/ChatBox";
import InfoContent from "components/InfoContent";
import Empty from "assert/images/Empty.png";

import Avatar from "components/common/Avatar";
import { getMessagesPrivate } from "redux/slices/messageSlice";
import { getUserByIds } from "redux/slices/usersSlice";
import { getConversations, setCurrentConversation } from "redux/slices/conversationSlice";
import { setCurrentReceiver } from "redux/slices/currentReceiverSlice";
import { setSocketOnlineUsers } from "redux/slices/socketOnlineUsers";
import { getUserIdFromLocalStorage } from "utils/auth";
import conversationApi from "api/conversationApi";
import { useHorizontalScroll } from "utils/customHook/useHorizontalScroll";

const Chat = ({ socket }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const users = useSelector(state => state.users.data);
  const conversations = useSelector(state => state.conversations.data);
  const currentConversation = useSelector(state => state.conversations.currentConversation);
  const currentReceiver = useSelector(state => state.currentReceiver.data);
  const socketOnlineUsers = useSelector(state => state.socketOnlineUsers.data);
  const scrollRef = useHorizontalScroll();

  const isLoading = useSelector(state => state.conversations.isLoading);
  const [searchUsers, setSearchUsers] = useState(undefined);

  useEffect(() => {
    socket.on("online_users", data => {
      const onlineUsers = Object.values(data);
      setSocketOnlineUsers([...onlineUsers]);
      const action = setSocketOnlineUsers([...onlineUsers]);
      dispatch(action);
    });
  }, []);

  useEffect(() => {
    if (currentReceiver) {
      const _onlineUser = socketOnlineUsers.find(user => user._id === currentReceiver._id);
      const action = setCurrentReceiver({ ...currentReceiver, ..._onlineUser });
      dispatch(action);
    }
  }, [socketOnlineUsers]);

  useEffect(() => {
    const id = user?._id || getUserIdFromLocalStorage();
    const action = getConversations({ id });
    dispatch(action);
  }, [user]);

  useEffect(() => {
    const ids = conversations
      ?.map(conversation => {
        if (conversation.userId === user._id) return conversation.senderId;
        return conversation.userId;
      })
      .filter(id => id !== user._id);
    const action = getUserByIds({ ids });
    dispatch(action);
    if (currentConversation.hasOwnProperty("userData")) {
      const _currentConversation = conversations.find(conversation => conversation._id === currentConversation._id);
      const action = setCurrentConversation(_currentConversation);
      dispatch(action);
    }
  }, [conversations]);

  const handleSelectConversation = conversation => {
    const action = setCurrentConversation(conversation);
    dispatch(action);

    let _currentReceiver = {};
    if (conversation.userId === user._id) {
      _currentReceiver = users.find(user => user._id === conversation.senderId);
    } else _currentReceiver = users.find(user => user._id === conversation.userId);
    const _onlineReceiver = socketOnlineUsers.find(user => user._id === _currentReceiver._id);
    if (_onlineReceiver) {
      _currentReceiver = { ..._currentReceiver, ..._onlineReceiver };
    }
    const currentReceiverAction = setCurrentReceiver(_currentReceiver);
    dispatch(currentReceiverAction);

    const data = {
      conversationId: conversation._id,
      limit: 10,
      offset: 0,
    };
    const getMessageAction = getMessagesPrivate(data);
    dispatch(getMessageAction);
  };

  const handleClickAvatar = async receiver => {
    const conversation = conversations.find(conversation => {
      return (
        (conversation.senderId === user._id && conversation.userId === receiver._id) ||
        (conversation.senderId === receiver._id && conversation.userId === user._id)
      );
    });
    if (conversation) {
      const action = setCurrentConversation(conversation);
      dispatch(action);
    } else {
      try {
        const payload = {
          userId: receiver._id,
          senderId: user._id,
          lastMessage: "",
        };

        const response = await conversationApi.postConversation(payload);
        if (response.error_code === 0) {
          const action = getConversations({ id: user._id });
          dispatch(action);
        }
      } catch (error) {
        toast.error("Cannot chat with this user!");
      }
    }
  };

  const getUserCardInfo = conversation => {
    if (user._id === conversation.userId) {
      return users.find(user => user._id === conversation.senderId);
    }
    return users.find(user => user._id === conversation.userId);
  };

  const onSearchChange = value => {
    // setSearch(value)
    // debounce(onSearchChange(value), 500)
  };

  const onsearchUsers = async data => {
    console.log("Searching users...", data);
  };

  return (
    <div className="-mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto grid grid-cols-12 gap-6">
      {isLoading ? (
        <div></div>
      ) : (
        <>
          <div className="col-span-12 xl:col-span-3 -mt-16 xl:mt-0 pt-20 xl:-mr-6 px-6 xl:pt-6 flex-col overflow-hidden">
            <div className="text-xl font-medium">Chats</div>
            <div className="mt-5 box">
              <TextInput placeholder="Search for users..." appendIcon="search" inputChange={onSearchChange} />
            </div>
            <div className="flex-none overflow-x-auto overflow-y-hidden scroll scrollbar-hidden" ref={scrollRef}>
              <div className="flex mt-6">
                {socketOnlineUsers?.length > 0 &&
                  socketOnlineUsers.map((onlineUser, index) => {
                    if (onlineUser?._id !== user?._id)
                      return (
                        <div className="flex flex-col items-center mr-3" key={onlineUser._id}>
                          <Avatar click={handleClickAvatar} key={index} user={onlineUser} status="online" className="cursor-pointer" />
                          <span className="text-gray-500 mt-1">{onlineUser.name}</span>
                        </div>
                      );
                    return <div key={index}></div>;
                  })}
              </div>
            </div>
            <div className="text-base font-medium leading-tight mt-3">Recent Chats</div>
            <div className="overflow-y-auto scrollbar-hidden -mx-5 px-5 user-card-container">
              {conversations?.length &&
                conversations.map((conversation, index) => {
                  return (
                    <UserCard
                      key={index}
                      conversation={conversation}
                      click={handleSelectConversation}
                      zoomIn
                      user={getUserCardInfo(conversation)}
                      status="online"
                      lastMessage={conversation.lastMessage}
                      showtime
                      showLastMsg
                      selected={conversation?._id === currentConversation?._id}
                    />
                  );
                })}
            </div>
          </div>
          {!isEmpty(currentConversation) ? (
            <>
              <div className="chat-box col-span-12 xl:col-span-6 flex flex-col overflow-hidden xl:border-l xl:border-r p-6">
                <ChatBox socket={socket} />
              </div>
              <div className="info-content col-span-12 xl:col-span-3 flex flex-col overflow-hidden pl-6 xl:pl-0 pr-6">
                <InfoContent />{" "}
              </div>
            </>
          ) : (
            <div className="col-span-12 xl:col-span-9 flex justify-center items-center xl:border-l xl:border-r">
              <img src={Empty} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
