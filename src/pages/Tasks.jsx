import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import { BsPlusCircle } from "react-icons/bs";
import { useForm } from "react-hook-form";
import moment from "moment";
import { DateRangePicker } from "react-dates";

import TaskCard from "components/TaskCard";
import { getTasks, addTask } from "redux/slices/taskSlice";
import { getUserIdFromLocalStorage } from "utils/auth";
import taskApi from "api/taskApi";
import { mapStatusToId, mapIdToColor } from "utils/global";
import Modal from "components/common/Modal";
import Loading from "./Loading";
import UserCombobox from "components/UserCombobox";

const getTasksByStatus = tasks => {
  const taskStatus = tasks.reduce(
    (acc, task, index) => {
      if (task.status === 0) {
        const toDo = {
          name: "Todo",
          tasks: [...acc.toDo.tasks, task],
        };
        acc = { ...acc, toDo };
      } else if (task.status === 1) {
        const inProcess = {
          name: "In process",
          tasks: [...acc.inProcess.tasks, task],
        };
        acc = { ...acc, inProcess };
      } else if (task.status === 2) {
        const inReview = {
          name: "In review",
          tasks: [...acc.inReview.tasks, task],
        };
        acc = { ...acc, inReview };
      } else if (task.status === 3) {
        const done = {
          name: "Done",
          tasks: [...acc.done.tasks, task],
        };
        acc = { ...acc, done };
      }
      return acc;
    },
    {
      toDo: {
        name: "Todo",
        tasks: [],
      },
      inProcess: {
        name: "In process",
        tasks: [],
      },
      inReview: {
        name: "In review",
        tasks: [],
      },
      done: {
        name: "Done",
        tasks: [],
      },
    }
  );
  return taskStatus;
};

const updateStatusTask = async (taskId, status) => {
  try {
    const _status = mapStatusToId(status);
    const response = await taskApi.updateStatus({ id: taskId, status: _status });
    if (response.error_code === 0) {
      toast.success("Update status successfully");
    }
  } catch (error) {
    toast.error("Update status fail");
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.tasks];
    const destItems = [...destColumn.tasks];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tasks: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        tasks: destItems,
      },
    });
    updateStatusTask(result.draggableId, destination.droppableId);
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.tasks];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        tasks: copiedItems,
      },
    });
  }
};

const defaultStartDate = moment().subtract(1, "weeks").startOf("week");
const defaultEndDate = moment().endOf("week");

const Task = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.data);
  const tasks = useSelector(state => state.tasks.data);
  const [columns, setColumns] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(undefined);
  const isLoading = useSelector(state => state.tasks.isLoading);
  const [assigneeId, setAssigneeId] = useState("");
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);
  const [focusedInput, setFocusedInput] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getTasksByUserId();
  }, [startDate, endDate]);

  const getTasksByUserId = () => {
    const userId = user._id || getUserIdFromLocalStorage();
    const action = getTasks({ id: userId, startTime: moment(startDate).format(), endTime: moment(endDate).format() });
    dispatch(action);
  };

  useEffect(() => {
    setColumns(getTasksByStatus(tasks));
  }, [tasks]);

  useEffect(() => {
    // Send to backend to hold position information
    console.log(columns);
  }, [columns]);

  const handleOpenModal = status => {
    setCurrentStatus(status);
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    reset();
    setIsOpenModal(false);
  };

  const onSubmit = async data => {
    try {
      const payload = {
        creatorId: user._id || getUserIdFromLocalStorage(),
        assigneeId: assigneeId || getUserIdFromLocalStorage(),
        ...data,
        status: currentStatus || 0,
      };

      const response = await taskApi.postTask(payload);
      if (response.error_code === 0) {
        toast.success("Create task successfully");
        handleCloseModal();
        if (assigneeId === user._id) {
          const _tasks = response.data.task;
          const action = addTask(_tasks);
          dispatch(action);
        }
      }
    } catch (err) {
      toast.error("Create task failed");
    }
  };

  const onSelectUser = user => {
    setAssigneeId(user._id);
  };

  return (
    <div className="-mt-16 ml-auto xl:-ml-16 mr-auto xl:pl-16 pt-16 xl:h-screen w-auto sm:w-3/5 xl:w-auto">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="h-full w-full ">
            <div className="text-xl font-medium pt-6 px-6">
              Task Manager{" "}
              <DateRangePicker
                startDateId="start-date"
                startDate={startDate}
                endDateId="end-date"
                endDate={endDate}
                onDatesChange={({ startDate, endDate }) => {
                  setStartDate(startDate);
                  setEndDate(endDate);
                }}
                focusedInput={focusedInput}
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                numberOfMonths={2}
                small
                isOutsideRange={() => false}
                displayFormat={() => "DD/MM/YYYY"}
                noBorder
              />
            </div>
            <div className="grid grid-cols-12 gap-6 pb-8 px-2 pt-4">
              <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([columnId, column], index) => {
                  return (
                    <div className="col-span-3" key={columnId}>
                      <div className="m-2 pl-2 flex items-center">
                        <p className="text-base font-bold leading-tight" style={{ color: mapIdToColor(columnId) }}>
                          {column.name} <span className="text-sm font-medium ml-2">{column.tasks.length || 0}</span>
                        </p>
                        <BsPlusCircle size={16} onClick={() => handleOpenModal(index)} className="ml-2 cursor-pointer" />
                      </div>
                      <div className="m-2">
                        <Droppable droppableId={columnId} key={columnId}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                className="p-2 rounded-md"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                  border: snapshot.isDraggingOver ? `2px dashed ${mapIdToColor(columnId)}` : "none",
                                  minHeight: "calc(100vh - 228px)",
                                }}>
                                {column.tasks.map((item, index) => {
                                  return <TaskCard task={item} index={index} key={item._id} />;
                                })}
                                {provided.placeholder}
                              </div>
                            );
                          }}
                        </Droppable>
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
            </div>
          </div>
          <Modal isOpen={isOpenModal} handleOnClose={handleCloseModal} titleModal="Add Task">
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" className="text-input-form py-3 px-4 auth__input mb-4" placeholder="Title" {...register("title")} />
                <input type="text" className="text-input-form py-3 px-4 auth__input mb-4" placeholder="Content" {...register("content")} />
                <UserCombobox onSelectUser={onSelectUser} inputClassName="border-user-search" />
                <div className="mt-2 flex justify-end items-center w-80 ml-auto">
                  <button className="btn btn-secondary" onClick={handleCloseModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary ml-2">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Task;
