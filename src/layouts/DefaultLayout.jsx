import React, { useEffect, useRef, useState } from "react";
import SideMenu from "components/SideMenu";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import notification from "assert/sounds/notification.wav";

import { getGroups } from "redux/slices/groupSlice";
import TopBar from "components/TopBar";
import { addMessage } from "redux/slices/messageSlice";
import { addMessageGroup } from "redux/slices/messageGroupSlice";
import { getConversations, setCurrentConversation } from "redux/slices/conversationSlice";
import { getUserIdFromLocalStorage } from "utils/auth";

const DefaultLayout = ({ children, socket }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const groups = useSelector(state => state.groups.data);
  const currentConversation = useSelector(state => state.conversations.currentConversation);
  const currentGroup = useSelector(state => state.groups.currentGroup);
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
  }, [currentConversation._id]);

  useEffect(() => {
    notificationSound.current = new Audio(notification);
    const userId = user._id || getUserIdFromLocalStorage();
    const action = getGroups({ id: userId });
    dispatch(action);
  }, []);

  useEffect(() => {
    socket.on("invited", (data) => {
      if (data.userId === user._id) {
        toast.info("You have been added to the group");
        const action = getGroups({ id: user._id });
        dispatch(action);
      }
    });
  }, [])

  useEffect(() => {
    const groupIds = groups.map(group => group?.groupId?._id);
    if (groupIds.length) {
      groupIds.forEach(groupId => {
        socket.emit("join_group", { userId: user._id, groupId: groupId });
      });
    }
  }, [groups.length]);

  useEffect(() => {
    socket.on("msg_group_receive", data => {
      const userId = user._id || getUserIdFromLocalStorage();
      const action = getGroups({ id: userId });
      dispatch(action);

      if (data.groupId === currentGroup._id) {
        const action = addMessageGroup(data);
        dispatch(action);
      }
      if (notificationSound.current) {
        notificationSound.current.play();
      }
    });
  }, [currentGroup._id]);

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
