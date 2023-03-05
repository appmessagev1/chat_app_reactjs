import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CiCamera, CiMicrophoneOn } from "react-icons/ci";

import Avatar from "components/common/Avatar";

const UserCard = ({
  statusMsg,
  zoomIn,
  user,
  conversation,
  selected,
  hasMedia,
  statusPosition,
  className,
  click,
  showtime,
  showLastMsg,
  lastMessage,
}) => {
  return (
    <div className={zoomIn && "zoom-in"} onClick={e => click(conversation || user)}>
      <div className={`box cursor-pointer relative flex items-center px-4 py-3 mt-4 ${selected && "!bg-primary"} ${className}`}>
        <Avatar user={user} statusPosition={statusPosition} className="mr-1" />
        <div className="ml-2 overflow-hidden flex-1">
          <p className={`font-medium text-gray-800 ${selected && "text-white"}`}>{user?.name || user?.email}</p>

          {showLastMsg && <div className={`text-opacity-80 w-4/5 truncate mt-0.5 text-gray-800 ${selected && "text-white"}`}>{lastMessage}</div>}
          {statusMsg && (
            <div className={`capitalize text-opacity-80 w-4/5 truncate mt-0.5 text-gray-800 ${selected && "text-white"}`}>{user?.status}</div>
          )}
        </div>
        {showtime && (
          <div className="flex flex-col">
            <div className={`whitespace-nowrap text-opacity-80 text-xs text-gray-800  ${selected && "text-white"}`}>{user?.time}</div>
          </div>
        )}
        {hasMedia && (
          <div className="flex">
            <CiCamera size={24} className="mr-4" />
            <CiMicrophoneOn size={24} className="mr-1" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
