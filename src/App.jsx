import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [folderName, setFolderName] = useState("No Folder Selected");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [resultsCount, setResultsCount] = useState(0);
  const [similarWords, setSimilarWords] = useState([]);
  const [isAssistedSearchOn, setIsAssistedSearchOn] = useState(false);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);

  function handleSearch(keywords) {
    setSearchKeyword(keywords[0]);

    const lowerCaseKeywords = keywords.map((keyword) => keyword.toLowerCase());

    const validFiles = files.map((file) => {
      const fileText = (file.text || "").toLowerCase();
      const fileName = (file.name || "").toLowerCase();

      const matchedWords = lowerCaseKeywords.filter(
        (keyword) => fileText.includes(keyword) || fileName.includes(keyword)
      );

      return {
        ...file,
        text: file.text || "",
        name: file.name || "",
        matchedWords,
      };
    });

    const filtered = validFiles.filter((file) =>
      lowerCaseKeywords.some(
        (keyword) => file.text.includes(keyword) || file.name.includes(keyword)
      )
    );

    console.log("Filtered Files:", filtered);

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
        folderName={folderName}
        setFolderName={setFolderName}
        searchKeyword={searchKeyword}
        resultsCount={resultsCount}
        similarWords={similarWords}
        isAssistedSearchOn={isAssistedSearchOn}
        setIsAssistedSearchOn={setIsAssistedSearchOn}
        onSearch={handleSearch}
        setSimilarWords={setSimilarWords}
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
