import React from "react";
import { CiBellOn } from "react-icons/ci";
import { useSelector } from "react-redux";

import Avatar from "components/common/Avatar";

const TopBar = () => {

  const currentUser = useSelector(state => state.user.data)

  return (
    <div className="top-bar fixed top-0 left-0 w-full h-16 z-50">
      <div className="top-bar__content bg-white border-theme-3 border-b w-full h-full flex px-5">
        <a className="hidden md:flex items-center h-full mr-auto">
          <div className="text-base font-light ml-4">
            <span className="font-medium">App </span>
            Message
          </div>
        </a>
        {/* <div className="hidden md:flex items-center px-5">
          <a className="btn a-btn btn-primary">Invite Friends</a>
        </div> */}
        {/* <div className="notification">
          <div className="relative flex justify-center items-center h-full md:border-r md:border-l">
            <CiBellOn className="mx-4" size={28} />
            <div className="absolute w-2 h-2 bg-primary rounded-full right-5 transform -translate-y-3/4"></div>
          </div>
        </div> */}
        <div className="account">
          <div className="flex justify-center items-center h-full pl-5">
            <Avatar user={currentUser} size="mini" />
            <div className="ml-2">
              <div className="font-medium mb-1/3 leading-tight truncate w-28">{currentUser?.name || currentUser?.email}</div>
              <div className="text-gray-600 text-xs">{currentUser?.title}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
