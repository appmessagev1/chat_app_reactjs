import React, { useState, useCallback, useMemo } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

const defaultDate = moment()

const ScheduleBoard = ({ onClickSlot }) => {
  const [events, setEvents] = useState([]);

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

  const onSelectSlot = (slotInfo) => {
    console.log(slotInfo)
  }

  return (
    <DragAndDropCalendar
      defaultDate={defaultDate}
      defaultView={Views.MONTH}
      events={events}
      localizer={localizer}
      onEventDrop={moveEvent}
      selectable={true}
      onEventResize={resizeEvent}
      onSelectSlot={onClickSlot}
      popup
      resizable
    />
  );
};

export default ScheduleBoard;