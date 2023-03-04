import React, { useEffect, useRef, useState } from "react";
import SideMenu from "components/SideMenu";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import notification from "assert/sounds/notification.wav";

import TopBar from "components/TopBar";
import { addMessage } from "redux/slices/messageSlice";
import { getConversations, setCurrentConversation } from "redux/slices/conversationSlice";
import { getUserIdFromLocalStorage } from "utils/auth";

const DefaultLayout = ({ children, socket }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data)
  const currentConversation = useSelector(state => state.conversations.currentConversation);
  const notificationSound = useRef(null);

  useEffect(() => {
    socket.on("msg_receive", data => {
      const id = user?._id || getUserIdFromLocalStorage();
      const action = getConversations({ id });
      dispatch(action);

      if (data.conversationId === currentConversation._id) {
        const action = addMessage(data);
        dispatch(action);
      }
      if (notificationSound.current) {
        notificationSound.current.play();
      }
    });
  }, [currentConversation]);

  useEffect(() => {
    notificationSound.current = new Audio(notification);
  }, []);

  return (
    <div className="bg-light-blue w-full h-screen">
      <TopBar />
      <SideMenu />
      <main className="md:pl-16 pt-16 overflow-auto main-section scrollbar-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
