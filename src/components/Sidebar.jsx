import React, { useState } from "react";
import FileManager from "./FileManager";
import SearchBar from "./SearchBar";

export default function Sidebar({
  setFiles,
  folderName,
  setFolderName,
  files,
  setFilteredFiles,
}) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [resultsCount, setResultsCount] = useState(0);

  const validateFiles = (files) => {
    return files.map((file) => ({
      ...file,
      text: file.text || "",
    }));
  };

  const handleSearch = (keywords) => {
    console.log("Filtering with keywords:", keywords);
    const validFiles = validateFiles(files);
    const filtered = validFiles.filter((file) =>
      keywords.some((keyword) =>
        file.text.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    setResultsCount(filtered.length); // Set results count
    if (filtered.length === 0) {
      alert("No words found");
    }

    setFilteredFiles(filtered);
  };

  return (
    <div className="sidebarBG">
      <div className="searchParameters">
        <FileManager setFiles={setFiles} setFolderName={setFolderName} />
        <p className="folderName">{folderName}</p>
        <SearchBar
          onSearch={(keywords) => {
            setSearchKeyword(keywords[0]);
            handleSearch(keywords);
          }}
          searchKeyword={searchKeyword}
        />
        <p>Results found: {resultsCount}</p> {/* Display results count */}
      </div>
    </div>
  );
}
