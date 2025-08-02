import React, { useState, useEffect } from 'react';
import CalendarGrid from './components/CalendarGrid';
import ListView from './components/ListView';
import Header from './components/Header';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [events, setEvents] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    const savedTheme = localStorage.getItem('theme') || 'light';
    setEvents(savedEvents);
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('theme', theme);
  }, [events, theme]);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <div className="container">
      <Header setViewMode={setViewMode} viewMode={viewMode} />
      <ThemeToggle theme={theme} setTheme={setTheme} />
      {viewMode === 'grid' ? (
        <CalendarGrid events={events} setEvents={setEvents} />
      ) : (
        <ListView events={events} setEvents={setEvents} />
      )}
      <div className="calendar-footer">
        Naga Mahesh Kona © 2025 royalkona4@gmail.com
      </div>
    </div>
  );
};

export default App;
