import React, { useState, useCallback, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from "moment";
import { useForm } from "react-hook-form";
import TimeField from "react-simple-timefield";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import eventApi from "api/eventApi";

import { getUserIdFromLocalStorage } from "utils/auth";
import Modal from "./common/Modal";

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

const defaultDate = moment();

const ScheduleBoard = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const user = useSelector(state => state.user.data)
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    console.log(events)
  }, [events])

  const getEvents = async () => {
    try {
      const response = await eventApi.getEventByUserId({ id: user._id || getUserIdFromLocalStorage() })
      if (response.error_code === 0) {
        const events = response.data.map(event => event.eventData[0])
        setEvents(events)
      }
    } catch (error) {
      toast.error("Cannot get events")
    }
  }

  const onChangeStartTime = event => {
    setStartTime(event.target.value);
  };
  const onChangeEndTime = event => {
    setEndTime(event.target.value);
  };

  const handleShowModal = () => {
    setIsShowModal(true);
  };

  const handleCloseModal = () => {
    setIsShowModal(false);
  };

  const onClickSlot = slotInfo => {
    setDate(moment(slotInfo.start).format("DD/MM/YYYY"));
    handleShowModal();
  };

  const onSubmit = async data => {
    const startDateTime = moment(date + " " + data.startTime, "DD/MM/YYYY HH:mm").format();
    const endDateTime = moment(date + " " + data.endTime, "DD/MM/YYYY HH:mm").format();
    if (startDateTime >= endDateTime) {
      toast.error("Invalid start time");
      return;
    }
    const body = {
      title: data.title,
      desc: data.desc,
      start: startDateTime,
      end: endDateTime,
      creatorId: user._id || getUserIdFromLocalStorage(),
      memberIds: [user._id || getUserIdFromLocalStorage()],
    };
    try {
      const response = await eventApi.postEvent(body);
      if (response.error_code === 0) {
        setEvents([...events, response.data.events]);
        toast.success("Create event successfully");
        handleCloseModal()
      }
    } catch (error) {
      toast.error("Cannot create event");
    }
  };

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setEvents(prev => {
        const existing = prev.find(ev => ev.id === event.id) ?? {};
        const filtered = prev.filter(ev => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setEvents(prev => {
        const existing = prev.find(ev => ev.id === event.id) ?? {};
        const filtered = prev.filter(ev => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setEvents]
  );

  return (
    <>
      <DragAndDropCalendar
        defaultDate={defaultDate}
        defaultView={Views.MONTH}
        events={events}
        views={['month', 'day']}
        localizer={localizer}
        onEventDrop={moveEvent}
        selectable={true}
        onEventResize={resizeEvent}
        onSelectSlot={onClickSlot}
        popup
        resizable
      />
      <Modal isOpen={isShowModal} handleOnClose={handleCloseModal} titleModal="Add event">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" className="text-input-form py-3 px-4 auth__input mb-4" placeholder="Title" {...register("title")} />
            <input type="text" className="text-input-form py-3 px-4 auth__input mb-4" placeholder="Description" {...register("desc")} />
            <div className="flex items-center gap-10 mb-4">
              <span className="w-20">Date:</span>
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-10 mb-4">
              <span className="w-20">Start time:</span>
              <TimeField
                value={startTime}
                onChange={onChangeStartTime}
                showSeconds={false}
                input={<input type="text" className="border-user-search rounded-md" {...register("startTime")} />}
              />
            </div>
            <div className="flex items-center gap-10">
              <span className="w-20">End time</span>
              <TimeField
                value={endTime}
                onChange={onChangeEndTime}
                showSeconds={false}
                input={<input type="text" className="border-user-search rounded-md" {...register("endTime")} />}
              />
            </div>
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
  );
};

export default ScheduleBoard;
