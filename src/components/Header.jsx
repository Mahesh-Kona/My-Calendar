import React from 'react';

const Header = ({ viewMode, setViewMode }) => {
  return (
    <div className="header">
      <h1>📅 My Calendar</h1>
      <div className="button-group">
        <button
          className={viewMode === 'grid' ? 'active' : ''}
          onClick={() => setViewMode('grid')}
        >
          Grid View
        </button>
        <button
          className={viewMode === 'list' ? 'active' : ''}
          onClick={() => setViewMode('list')}
        >
          List View
        </button>
      </div>
    </div>
  );
};

export default Header;
