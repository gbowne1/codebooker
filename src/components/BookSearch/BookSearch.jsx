import React from 'react';
import './BookSearch.css';

function SearchWindow({filter, setFilter}) {
  return (
    <div className="search-window">
      <input type="text" placeholder="Search..." className="search-input" value={filter} onChange={(e) => setFilter(e.target.value)}/>
      {/* <button className="search-button">Search</button> */}
    </div>
  );
}

export default SearchWindow;
