import React, { useState } from 'react';
import { format } from 'date-fns';

const EventModal = ({ date, closeModal, events, setEvents }) => {
  const [title, setTitle] = useState('');

  const handleAddEvent = () => {
    if (!title.trim()) return;

    const newEvent = {
      title: title.trim(),
      date: date.toISOString(),
    };

    setEvents([...events, newEvent]);
    setTitle('');
    closeModal();
  };

  const formattedDate = format(date, 'dd MMM yyyy');

  const eventsForDate = events.filter(
    (event) => new Date(event.date).toDateString() === date.toDateString()
  );

  return (
    <div className="modal">
      <div className={`modal-content`}>
        <span className="close-btn" onClick={closeModal}>
          ❌
        </span>
        <h2>Events on {formattedDate}</h2>

        <ul>
          {eventsForDate.length > 0 ? (
            eventsForDate.map((event, index) => <li key={index}>{event.title}</li>)
          ) : (
            <li>No events for this day.</li>
          )}
        </ul>

        <div style={{ marginTop: '15px' }}>
          <input
            type="text"
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '6px', width: '80%' }}
          />
          <button onClick={handleAddEvent} style={{ marginLeft: '10px' }}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
