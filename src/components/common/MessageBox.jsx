import React from "react";
import { useSelector } from "react-redux";

const MessageBox = ({ content, senderId, senderName, isPrivate }) => {
  const user = useSelector(state => state.user.data);

  return (
    <div className={`chat-text-box__content flex items-center ${senderId === user._id ? "justify-end" : "justify-start"}`}>
      <div className="mt-2">
        { !isPrivate && senderId !== user._id && <span className="text-xs">{senderName}</span>}
        <div
          className={`box max-w-xl break-words leading-relaxed text-gray-700 px-4 py-3 mt-1 ${
            senderId === user._id ? "!bg-primary !text-white" : ""
          }`}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
