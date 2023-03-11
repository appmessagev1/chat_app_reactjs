import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CiMail, CiUser, CiSettings, CiBoxes, CiChat1 } from "react-icons/ci";
import { BsListTask } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import {AiOutlineSchedule} from "react-icons/ai"

import { doSignOut } from "redux/slices/authSlice";

const SideMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      icon: <CiChat1 size={24} color={location.pathname === "/" ? "#007aff" : ""} />,
      text: "Chats",
      class: "chats",
      link: "/",
    },
    {
      icon: <CiBoxes size={24} color={location.pathname === "/groups" ? "#007aff" : ""} />,
      text: "Groups",
      class: "groups",
      link: "/groups",
    },
    {
      icon: <BsListTask size={24} color={location.pathname === "/tasks" ? "#007aff" : ""} />,
      text: "Tasks",
      class: "tasks",
      link: "/tasks",
    },
    {
      icon: <AiOutlineSchedule size={24} color={location.pathname === "/schedule" ? "#007aff" : ""} />,
      text: "Schedule",
      class: "schedule",
      link: "/schedule",
    },
    {
      icon: <CiUser size={24} color={location.pathname === "/profile" ? "#007aff" : ""} />,
      text: "Profile",
      class: "profile",
      link: "/profile",
    },
    {
      icon: <CiSettings size={24} color={location.pathname === "/settings" ? "#007aff" : ""} />,
      text: "Settings",
      class: 'settings',
      link: "/settings",
    },
  ];

  const signOut = () => {
    const action = doSignOut();
    dispatch(action);
    navigate("/sign_in");
  };

  return (
    <div className="side-menu hidden md:block top-0 left-0 fixed w-16 h-screen z-40">
      <div className="side-menu__content box border-r w-full h-full flex flex-col justify-center pt-16 relative">
        {menu.map((item, index) => {
          return (
            <div key={index}>
              <div key={index} className={`cursor-pointer link-${item.class}`}>
                <Link to={item.link} className="side-menu__content__link text-gray-600 py-5 flex justify-center">
                  {item.icon}
                </Link>
              </div>
              <Tooltip anchorSelect={`.link-${item.class}`} place="right" className="!rounded-md !bg-gray-400">
                {item.text}
              </Tooltip>
            </div>
          );
        })}
        <div className="absolute bottom-0 left-0 flex justify-center items-center w-full py-4 cursor-pointer link-sign-out" onClick={signOut}>
          <IoIosLogOut size={24} />
        </div>
        <Tooltip anchorSelect={`.link-sign-out`} place="right" className="!rounded-md !bg-gray-400">
          Sign out
        </Tooltip>
      </div>
    </div>
  );
};

export default SideMenu;
