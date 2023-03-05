import React from "react";
import { Tooltip } from "react-tooltip";

const Avatar = ({ img, alt, size, statusPosition, className, user, click }) => {
  return (
    <>
      <div
        onClick={e => click(user)}
        className={`${
          size === "small" ? "w-8 h-8" : size === "big" ? "w-24 h-24" : size === "mini" ? "w-4 h-4" : "w-12 h-12"
        } avatar flex-none rounded-full relative ${className}`}>
        <img className="rounded-full w-full h-full object-cover absolute" src={user?.avatar || img} alt={alt || "Avatar"}></img>
        {user?.status && (
          <div
            className={`${user.status === "online" ? "bg-green-500" : "bg-gray-500"}
        ${statusPosition === "top" ? "right-4 top-0" : "right-0 bottom-0"}
        border-white w-3 h-3 absolute   rounded-full border-2`}></div>
        )}
      </div>
      <Tooltip anchorSelect=".avatar" place="top" className="!rounded-md !bg-gray-400">
        {user?.name || user?.email}
      </Tooltip>
    </>
  );
};

export default Avatar;
