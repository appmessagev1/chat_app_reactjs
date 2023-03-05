import moment from "moment/moment";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { formatTaskTime } from "utils/global"
import Avatar from "./common/Avatar";

const TaskCard = ({ task, index }) => {
  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="box p-4 mb-2 min-h-20 rounded-md bg-white"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              // background: snapshot.isDragging ? "" : "",
              ...provided.draggableProps.style,
            }}>
            <div className="flex items-center justify-between">
              <div className="font-medium">{task.title}</div>
              <Avatar user={task.creator?.[0]} size="mini" hasTooltip/>
            </div>
            <div className="mt-2">
              <p className="break-words">{task.content}aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
            </div>
            <div className="text-end mt-2 text-gray-500 text-xs">{formatTaskTime(task.createdAt)}</div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
