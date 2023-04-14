import React from 'react';
import './BookSearch.css';

function SearchWindow() {
  return (
    <div className="search-window">
      <input type="text" placeholder="Search..." className="search-input" />
      <button className="search-button">Search</button>
    </div>
  );
}

export default SearchWindow;
