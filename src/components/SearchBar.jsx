import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  return (
    <div className="searchField">
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search for Keywords"
      />
      <button className="searchButton" onClick={handleSearch}>
        <i className="fa-solid fa-magnifying-glass searchIcon"></i>
      </button>
    </div>
  );
};

export default SearchBar;
