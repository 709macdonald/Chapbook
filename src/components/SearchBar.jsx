import React, { useState, useEffect } from "react";

const SearchBar = ({
  onSearch,
  searchKeyword,
  similarWords,
  setSimilarWords,
  isAssistedSearchOn,
  setIsAssistedSearchOn,
  files,
}) => {
  const [keyword, setKeyword] = useState(searchKeyword);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    setKeyword(searchKeyword);
  }, [searchKeyword]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
      updateSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword]);

  useEffect(() => {
    if (!isAssistedSearchOn) {
      handleSearch(true);
    } else {
      handleSearch();
    }
  }, [isAssistedSearchOn]);

  const updateSuggestions = () => {
    if (!keyword) {
      setSuggestions([]);
      return;
    }

    const lowerCaseKeyword = keyword.toLowerCase();
    const matchedSuggestions = files
      .flatMap((file) => [...file.text.split(/\s+/), file.name])
      .filter((word) => word.toLowerCase().startsWith(lowerCaseKeyword))
      .slice(0, 10);

    setSuggestions(matchedSuggestions);
  };

  const handleSearch = async (onlyMainKeyword = false) => {
    let searchKeywords = [keyword];

    if (isAssistedSearchOn && !onlyMainKeyword) {
      const fetchedSimilarWords = await fetchSimilarWords(keyword);
      if (fetchedSimilarWords.length === 0) {
        setSimilarWords([]);
      } else {
        setSimilarWords(fetchedSimilarWords.slice(0, 10));
        searchKeywords = [
          ...searchKeywords,
          ...fetchedSimilarWords.slice(0, 10),
        ];
      }
    } else {
      setSimilarWords([]);
    }

    onSearch(searchKeywords);
  };

  const fetchSimilarWords = async (word) => {
    try {
      const response = await fetch(`https://api.datamuse.com/words?ml=${word}`);
      const data = await response.json();
      return data.map((item) => item.word);
    } catch (error) {
      console.error("Error fetching similar words:", error);
      return [];
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setSuggestions([]);
    handleSearch();
  };

  return (
    <div>
      <div className="searchField">
        <input
          type="text"
          id="searchBar"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for Keywords"
        />
        {suggestions.length > 0 ? (
          <ul className="suggestionsDropdown">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="suggestionItem"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        ) : (
          keyword && <p className="noResults">No suggestions found</p>
        )}
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
      {isAssistedSearchOn && similarWords.length > 0 ? (
        <div className="similarWordsList">
          <p>Similar words:</p>
          <ul className="similarWord">
            {similarWords.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      ) : isAssistedSearchOn ? (
        <p className="noResults">No similar words found</p>
      ) : null}
    </div>
  );
};

export default SearchBar;
