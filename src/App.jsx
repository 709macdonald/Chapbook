import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

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

  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem("files", JSON.stringify(files));
    }
  }, [files]);

  const handleDeleteFile = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    setFilteredFiles(updatedFiles);
  };

  const handleSearch = (keywords) => {
    const searchTerm = keywords[0] || "";

    setSearchKeyword(searchTerm); // Update search keyword

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

    // No alert needed here; handle "No files found" in Main
  };

  useEffect(() => {
    setResultsCount(filteredFiles.length);
  }, [filteredFiles]);

  return (
    <>
      <Sidebar
        files={files}
        setFiles={setFiles}
        resultsCount={resultsCount}
        handleSearch={handleSearch}
        setIsLoadingFiles={setIsLoadingFiles}
      />
      <Main
        files={filteredFiles}
        isLoadingFiles={isLoadingFiles}
        setFiles={setFiles}
        handleDeleteFile={handleDeleteFile}
        searchKeyword={searchKeyword} // Pass searchKeyword to Main
      />
    </>
  );
}

export default App;
