import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = ({ task, index }) => {
  return (
    <Draggable key={task._id} draggableId={task._id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="box p-4 mb-2 h-16 rounded-md bg-white"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              // background: snapshot.isDragging ? "" : "",
              ...provided.draggableProps.style,
            }}>
            <span>{task.title}</span>
            <div>
              <p>{task.content}</p>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default TaskCard;
