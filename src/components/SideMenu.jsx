import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CiMail, CiUser, CiSettings, CiBoxes, CiChat1 } from "react-icons/ci";
import { BsListTask } from 'react-icons/bs'
import { IoIosLogOut } from 'react-icons/io';

import { doSignOut } from "redux/slices/authSlice";

const SideMenu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const menu = [
    {
      icon: <CiChat1 size={24} color={location.pathname === "/" && "#007aff"} />,
      text: "Chats",
      link: "/",
    },
    {
      icon: <CiBoxes size={24} color={location.pathname === "/groups" && "#007aff"} />,
      text: "Groups",
      link: "/groups",
    },
    {
      icon: <BsListTask size={24} color={location.pathname === "/tasks" && "#007aff"} />,
      text: "Tasks",
      link: "/tasks",
    },
    {
      icon: <CiUser size={24} color={location.pathname === "/profile" && "#007aff"} />,
      text: "Profile",
      link: "/profile",
    },
    {
      icon: <CiSettings size={24} color={location.pathname === "/settings" && "#007aff"} />,
      text: "Settings",
      link: "/settings",
    },
  ];

  const signOut = () => {
    const action = doSignOut()
    dispatch(action)
    navigate("/sign_in")
  }

  return (
    <div className="side-menu hidden md:block top-0 left-0 fixed w-16 h-screen z-40">
      <div className="side-menu__content box border-r w-full h-full flex flex-col justify-center overflow-hidden pt-16 relative">
        {menu.map((item, index) => {
          return (
            <div key={index} className="cursor-pointer">
              <Link to={item.link} className="side-menu__content__link text-gray-600 py-5 flex justify-center">
                {item.icon}
              </Link>
            </div>
          );
        })}
        <div
          className="absolute bottom-0 left-0 flex justify-center items-center w-full py-4 cursor-pointer"
          onClick={signOut}>
          <IoIosLogOut size={24} />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
