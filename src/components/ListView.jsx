import React, { useState } from 'react';
import {
  format,
  eachDayOfInterval,
  startOfToday,
  addYears,
  isSameDay,
} from 'date-fns';
import EventModal from './EventModal';

const ListView = ({ events, setEvents }) => {
  const today = startOfToday();
  const oneYearLater = addYears(today, 1);
  const daysInYear = eachDayOfInterval({ start: today, end: oneYearLater });

  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getEventsForDate = (date) => {
    return events.filter((event) => isSameDay(new Date(event.date), date));
  };

  const openModal = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  return (
    <div>
      <h2 style={{ marginTop: '20px' }}>📋 List View </h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {daysInYear.map((day) => {
          const dayEvents = getEventsForDate(day);
          return (
            <li key={day.toISOString()} style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>
                  {format(day, 'EEEE')} - {format(day, 'dd MMM yyyy')}
                </strong>
                <button
                  onClick={() => openModal(day)}
                  style={{
                    padding: '4px 10px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  + Add
                </button>
              </div>

              {dayEvents.length > 0 ? (
                <ul style={{ marginLeft: '15px' }}>
                  {dayEvents.map((event, index) => (
                    <li key={index}>{event.title}</li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: '#666', fontSize: '14px' }}>No events</div>
              )}
            </li>
          );
        })}
      </ul>

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

export default ListView;
