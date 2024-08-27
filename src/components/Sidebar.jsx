import React from "react";
import FileManager from "./FileManager";
import SearchBar from "./SearchBar";

export default function Sidebar({
  setFiles,
  folderName,
  setFolderName,
  files,
  setFilteredFiles,
}) {
  const validateFiles = (files) => {
    return files.map((file) => ({
      ...file,
      text: file.text || "",
    }));
  };

  const handleSearch = (keywords) => {
    if (!Array.isArray(keywords)) {
      console.error("Expected keywords to be an array");
      return;
    }

    const validFiles = validateFiles(files);
    const filtered = validFiles.filter((file) =>
      keywords.some((keyword) =>
        file.text.toLowerCase().includes(keyword.toLowerCase())
      )
    );

    console.log("Filtered files:", filtered); // Debugging output

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
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
}
