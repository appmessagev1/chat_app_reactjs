import React from "react";
import { CiMail, CiUser, CiSettings, CiBoxes, CiChat1 } from "react-icons/ci";
import { BsListTask } from 'react-icons/bs'
import { Link } from "react-router-dom";

const SideMenu = () => {
  const menu = [
    {
      icon: <CiChat1 size={24} />,
      text: "Chats",
      link: "/",
    },
    {
      icon: <CiBoxes size={24} />,
      text: "Groups",
      link: "/groups",
    },
    {
      icon: <BsListTask size={24} />,
      text: "Tasks",
      link: "/tasks"
    },
    {
      icon: <CiUser size={24} />,
      text: "Profile",
      link: "/profile",
    },
    {
      icon: <CiSettings size={24} />,
      text: "Settings",
      link: "/settings",
    },
  ];

  return (
    <div className="side-menu hidden md:block top-0 left-0 fixed w-16 h-screen z-40">
      <div className="side-menu__content box border-r w-full h-full flex flex-col justify-center overflow-hidden pt-16">
        {menu.map((item, index) => {
          return (
            <div key={index} className="cursor-pointer">
              <Link to={item.link} className="side-menu__content__link text-gray-600 py-5 flex justify-center">
                {item.icon}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu;
