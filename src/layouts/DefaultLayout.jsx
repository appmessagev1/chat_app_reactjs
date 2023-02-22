import React, { useEffect, useRef } from "react";
import SideMenu from "components/SideMenu";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import notification from "assert/sounds/notification.wav";

import TopBar from "components/TopBar";
import { setMessages } from "redux/slices/messageSlice";

const DefaultLayout = ({ children, socket }) => {
  const dispatch = useDispatch();
  const currentConversation = useSelector(state => state.conversations.currentConversation);
  const notificationSound = useRef(null);

  useEffect(() => {
    socket.on("msg_receive", data => {
      if (data.conversationId === currentConversation._id) {
        const action = setMessages(data);
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
