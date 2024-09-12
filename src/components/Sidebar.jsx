import React, { useState } from "react";
import FileManager from "./FileManager";
import SearchBar from "./SearchBar";

export default function Sidebar({
  setFiles,
  resultsCount,
  handleSearch,
  setIsLoadingFiles,
}) {
  const [folderName, setFolderName] = useState("No Selection.");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [similarWords, setSimilarWords] = useState([]);
  const [isAssistedSearchOn, setIsAssistedSearchOn] = useState(false);

  return (
    <div className="sidebarBG">
      <div className="sideBarLogo">
        <h2>
          Chap<span className="book">book</span>
        </h2>
      </div>
      <div className="searchParameters">
        <FileManager
          setFiles={setFiles}
          setFolderName={setFolderName}
          setIsLoadingFiles={setIsLoadingFiles}
          folderName={folderName}
        />
        <p className="resultsFound">Results found: {resultsCount}</p>

        <SearchBar
          onSearch={handleSearch}
          searchKeyword={searchKeyword}
          similarWords={similarWords}
          setSimilarWords={setSimilarWords}
          isAssistedSearchOn={isAssistedSearchOn}
          setIsAssistedSearchOn={setIsAssistedSearchOn}
        />
      </div>
    </div>
  );
}
