import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchField">
      <input
        type="text"
        id="searchBar"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for Keywords"
      />
      <button className="searchButton" onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass searchIcon"></i>
      </button>
    </div>
  );
};

export default SearchBar;
