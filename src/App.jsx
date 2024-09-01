import React, { useState } from "react";
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

  function handleSearch(keywords) {
    setSearchKeyword(keywords[0]);
    const validFiles = files.map((file) => ({
      ...file,
      text: file.text || "",
    }));
    const filtered = validFiles.filter((file) =>
      keywords.some((keyword) =>
        file.text.toLowerCase().includes(keyword.toLowerCase())
      )
    );
    setResultsCount(filtered.length);
    setFilteredFiles(filtered);
    if (filtered.length === 0) {
      alert("No words found");
    }
  }

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
      />
      <Main files={filteredFiles.length > 0 ? filteredFiles : files} />
    </>
  );
}

export default App;
