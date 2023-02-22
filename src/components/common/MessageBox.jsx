import React from "react";
import { useSelector } from "react-redux";

const MessageBox = ({ content, senderId }) => {
  const user = useSelector(state => state.user.data);

  return (
    <div className={`chat-text-box__content flex items-center ${senderId === user._id ? "justify-end" : "justify-start"}`}>
      <div
        className={`box max-w-xl break-words leading-relaxed text-gray-700 px-4 py-3 mt-3 ${senderId === user._id ? "!bg-primary !text-white" : ""}`}>
        {content}
      </div>
    </div>
  );
};

export default MessageBox;
