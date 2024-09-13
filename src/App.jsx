import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  // Load files from local storage on component mount
  useEffect(() => {
    const storedFiles = localStorage.getItem("files");
    if (storedFiles) {
      try {
        setFiles(JSON.parse(storedFiles));
      } catch (error) {
        console.error("Failed to parse files from local storage", error);
        localStorage.removeItem("files");
      }
    }
  }, []);

  // Save files to local storage whenever files state changes
  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem("files", JSON.stringify(files));
    }
  }, [files]);

  function handleSearch(keywords) {
    const searchTerm = keywords[0];

    if (!searchTerm) {
      setFilteredFiles([]);
      setResultsCount(files.length);

      setFiles((prevFiles) =>
        prevFiles.map((file) => ({
          ...file,
          matchedWords: [],
        }))
      );

      return;
    }

    const lowerCaseKeywords = keywords.map((keyword) => keyword.toLowerCase());

    const validFiles = files.map((file) => {
      const fileText = (file.text || "").toLowerCase();
      const fileName = (file.name || "").toLowerCase();

      const matchedWords = lowerCaseKeywords.filter(
        (keyword) => fileText.includes(keyword) || fileName.includes(keyword)
      );

      return {
        ...file,
        matchedWords,
      };
    });

    const filtered = validFiles.filter((file) => file.matchedWords.length > 0);

    setResultsCount(filtered.length);
    setFilteredFiles(filtered);

    if (filtered.length === 0) {
      alert("No words found");
    }
  }

  useEffect(() => {
    setResultsCount(files.length);
  }, [files]);

  useEffect(() => {
    if (isLoadingFiles) {
      console.log("Loading files...");
    } else {
      console.log("Not loading files.");
    }
  }, [isLoadingFiles]);

  return (
    <>
      <Sidebar
        setFiles={setFiles}
        resultsCount={resultsCount}
        handleSearch={handleSearch}
        setIsLoadingFiles={setIsLoadingFiles}
      />
      <Main
        files={filteredFiles.length > 0 ? filteredFiles : files}
        isLoadingFiles={isLoadingFiles}
      />
    </>
  );
}

export default App;
