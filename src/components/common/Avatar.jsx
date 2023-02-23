import React from "react";

const Avatar = ({ img, alt, size, statusPosition, className, user, click }) => {

  return (
    <div onClick={(e) => click(user)} className={`${size === "mini" ? "w-8 h-8" : size === 'big' ? "w-24 h-24" : 'w-12 h-12'} flex-none rounded-full relative ${className}`}>
      <img className="rounded-full w-full h-full object-cover absolute" src={user?.avatar || img} alt={alt || "Avatar"}></img>
      {user?.status && (
        <div
          className={`${user.status === "online" ? "bg-green-500" : "bg-gray-500"}
            ${statusPosition === "top" ? "right-4 top-0" : "right-0 bottom-0"}
          border-white w-3 h-3 absolute   rounded-full border-2`}></div>
      )}
    </div>
  );
};

export default Avatar;
