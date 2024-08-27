import React from "react";
import FileManager from "./FileManager";
import SearchBar from "./SearchBar";

export default function Sidebar({
  setFiles,
  folderName,
  setFolderName,
  searchKeyword,
  resultsCount,
  similarWords,
  isAssistedSearchOn,
  setIsAssistedSearchOn,
  onSearch,
  setSimilarWords,
}) {
  return (
    <div className="sidebarBG">
      <div className="searchParameters">
        <FileManager setFiles={setFiles} setFolderName={setFolderName} />
        <p className="folderName">{folderName}</p>
        <SearchBar
          onSearch={onSearch}
          searchKeyword={searchKeyword}
          similarWords={similarWords}
          setSimilarWords={setSimilarWords}
          isAssistedSearchOn={isAssistedSearchOn}
          setIsAssistedSearchOn={setIsAssistedSearchOn}
        />
        <p>Results found: {resultsCount}</p>
      </div>
    </div>
  );
}
