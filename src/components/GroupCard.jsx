import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai"

const GroupCard = ({ group, zoomIn, click, selected, className, showLastMsg, hasAction, clickAction }) => {
  const onClickAction = (e) => {
    e.stopPropagation();
    clickAction();
  }
  return (
    <div className={zoomIn && "zoom-in"} onClick={e => click(group)}>
      <div className={`box cursor-pointer relative flex items-center px-4 py-3 mt-4 ${selected && "!bg-primary"} ${className}`}>
        <div className="flex-1">
          <div className="font-medium text-gray-800">{group.name}</div>

          {showLastMsg && (
            <div className={`text-opacity-80 w-4/5 truncate mt-0.5 text-gray-800 ${selected && "text-white"}`}>{group.lastMessage}</div>
          )}
        </div>
        {hasAction && (
          <div className="cursor-pointer" onClick={onClickAction}>
            <AiOutlineUserAdd size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupCard;
