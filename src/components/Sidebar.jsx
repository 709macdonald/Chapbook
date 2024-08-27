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
  // Function to ensure file.text is always defined
  const validateFiles = (files) => {
    return files.map((file) => ({
      ...file,
      text: file.text || "", // Ensure text is never undefined
    }));
  };

  const handleSearch = (keyword) => {
    console.log("Keyword:", keyword);
    const validFiles = validateFiles(files);
    const filtered = validFiles.filter((file) =>
      file.text.toLowerCase().includes(keyword.toLowerCase())
    );

    if (filtered.length === 0) {
      alert("No words found");
    }

    setFilteredFiles(filtered);
    console.log(filtered);
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
