import React, { useState } from 'react';
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
} from 'date-fns';
import EventModal from './EventModal';

const CalendarGrid = ({ events, setEvents }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 }); // Sunday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const openModal = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const getEventsForDate = (date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const goToPrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <div>
      {/* Month Navigation */}
      <div className="month-nav">
        <button onClick={goToPrevMonth}>{'Prev'}</button>
        <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={goToNextMonth}>{'Next '}</button>
      </div>

      {/* Weekday Headers */}
      <div className="calendar-grid weekdays">
        {weekDays.map((day) => (
          <div key={day} className="weekday-header">
            {day}
          </div>
        ))}
      </div>

      {/* Date Grid */}
      <div className="calendar-grid">
        {calendarDays.map((day) => (
          <div
            key={day.toISOString()}
            className={`date-cell ${!isSameMonth(day, monthStart) ? 'outside-month' : ''}`}
            onClick={() => openModal(day)}
          >
            <strong>{format(day, 'd')}</strong>
            {getEventsForDate(day).map((event, index) => (
              <div key={index} className="event-indicator">
                {event.title}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Event Modal */}
      {showModal && selectedDate && (
        <EventModal
          date={selectedDate}
          closeModal={() => setShowModal(false)}
          events={events}
          setEvents={setEvents}
        />
      )}
    </div>
  );
};

export default CalendarGrid;
