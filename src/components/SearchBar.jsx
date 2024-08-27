import React, { useState } from "react";

const SearchBar = ({ onSearch, useAssistedSearch = false }) => {
  const [keyword, setKeyword] = useState("");
  const [isAssistedSearchOn, setIsAssistedSearchOn] =
    useState(useAssistedSearch);
  const [similarWords, setSimilarWords] = useState([]);

  const handleSearch = async () => {
    let searchKeywords = [keyword];

    if (isAssistedSearchOn) {
      const fetchedSimilarWords = await fetchSimilarWords(keyword);
      console.log("Similar words:", fetchedSimilarWords); // Debugging output
      setSimilarWords(fetchedSimilarWords.slice(0, 10)); // Limit to 10 words
      searchKeywords = [...searchKeywords, ...fetchedSimilarWords.slice(0, 10)];
    } else {
      setSimilarWords([]); // Clear similar words if assisted search is off
    }

    console.log("Search keywords:", searchKeywords); // Debugging output
    onSearch(searchKeywords);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const fetchSimilarWords = async (word) => {
    try {
      const response = await fetch(`https://api.datamuse.com/words?ml=${word}`);
      const data = await response.json();
      console.log("API Response:", data); // Debugging output
      return data.map((item) => item.word);
    } catch (error) {
      console.error("Error fetching similar words:", error);
      return [];
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
      <div>
        <label>
          Assisted Search:
          <input
            type="checkbox"
            checked={isAssistedSearchOn}
            onChange={() => setIsAssistedSearchOn(!isAssistedSearchOn)}
          />
        </label>
      </div>
      {isAssistedSearchOn && similarWords.length > 0 && (
        <div className="similarWordsList">
          <p>Similar words:</p>
          <ul>
            {similarWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
