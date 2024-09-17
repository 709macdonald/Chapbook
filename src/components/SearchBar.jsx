import React, { useState, useEffect } from "react";

const SearchBar = ({
  onSearch,
  searchKeyword,
  similarWords,
  setSimilarWords,
  isAssistedSearchOn,
  setIsAssistedSearchOn,
  files, // Pass files prop here to get the data to match words from
}) => {
  const [keyword, setKeyword] = useState(searchKeyword);
  const [suggestions, setSuggestions] = useState([]); // New state for predictive words

  useEffect(() => {
    setKeyword(searchKeyword); // Initialize keyword with searchKeyword
  }, [searchKeyword]);

  // Listen for changes in the keyword and update suggestions
  useEffect(() => {
    // Trigger search with delay (debounced)
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
      updateSuggestions(); // Generate the suggestions based on keyword input
    }, 300);

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
  }, [keyword]);

  // Handle assisted search toggle
  useEffect(() => {
    if (!isAssistedSearchOn) {
      // If assisted search is turned off, update search immediately with only the main keyword
      handleSearch(true);
    } else {
      // If assisted search is turned back on, update search with similar words
      handleSearch();
    }
  }, [isAssistedSearchOn]);

  // Generate suggestions for predictive search based on the keyword
  const updateSuggestions = () => {
    if (!keyword) {
      setSuggestions([]); // Clear suggestions if no input
      return;
    }

    const lowerCaseKeyword = keyword.toLowerCase();
    // Match words from the file names and content
    const matchedSuggestions = files
      .flatMap((file) => [
        ...file.text.split(/\s+/), // split file text into words
        file.name,
      ])
      .filter((word) => word.toLowerCase().startsWith(lowerCaseKeyword)) // Predictive logic
      .slice(0, 10); // Limit to 10 suggestions

    setSuggestions(matchedSuggestions);
  };

  const handleSearch = async (onlyMainKeyword = false) => {
    let searchKeywords = [keyword];

    if (isAssistedSearchOn && !onlyMainKeyword) {
      // Fetch similar words only if assisted search is on and not forced to only use the main keyword
      const fetchedSimilarWords = await fetchSimilarWords(keyword);
      if (fetchedSimilarWords.length === 0) {
        // If no similar words are found, clear similarWords state
        setSimilarWords([]);
      } else {
        setSimilarWords(fetchedSimilarWords.slice(0, 10));
        searchKeywords = [
          ...searchKeywords,
          ...fetchedSimilarWords.slice(0, 10),
        ];
      }
    } else {
      // Clear similar words if assisted search is off
      setSimilarWords([]);
    }

    // Perform the search with the main keywords
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
    setKeyword(suggestion); // Populate the search bar with the selected suggestion
    setSuggestions([]); // Clear suggestions after selection
    handleSearch(); // Trigger the search for the selected suggestion
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
        {/* Display suggestions below the search bar */}
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
