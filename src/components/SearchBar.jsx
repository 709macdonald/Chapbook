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
      console.log("Similar words:", fetchedSimilarWords);
      setSimilarWords(fetchedSimilarWords.slice(0, 10));
      searchKeywords = [...searchKeywords, ...fetchedSimilarWords.slice(0, 10)];
    } else {
      setSimilarWords([]);
    }

    console.log("Search keywords:", searchKeywords);
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
      console.log("API Response:", data);
      return data.map((item) => item.word);
    } catch (error) {
      console.error("Error fetching similar words:", error);
      return [];
    }
  };

  return (
    <div>
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
      <div className="assistedSearch">
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
          <ul className="similarWord">
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
