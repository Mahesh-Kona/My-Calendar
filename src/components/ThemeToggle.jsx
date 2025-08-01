import React from 'react';

const ThemeToggle = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="top-controls" style={{ textAlign: 'right', marginTop: '5px' }}>
      <button className="theme-toggle" onClick={toggleTheme} id="mahesh-btn">
         {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
};

export default ThemeToggle;
