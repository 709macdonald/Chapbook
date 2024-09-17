import React, { useState } from "react";
import LoadingGear from "./LoadingGear";
import FileDisplayScreen from "./FileDisplayScreen";
import FileViewScreen from "./FileViewScreen";

export default function Main({
  files,
  setFiles,
  isLoadingFiles,
  handleDeleteFile,
  searchKeyword, // Ensure this prop is passed correctly
}) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  const handleBackToDisplay = () => {
    setSelectedFile(null);
  };

  const handleUpdateFile = (updateFn) => {
    setFiles((prevFiles) => {
      const updatedFiles = updateFn(prevFiles);
      const updatedSelectedFile = updatedFiles.find(
        (f) => f.url === selectedFile.url
      );
      setSelectedFile(updatedSelectedFile);
      return updatedFiles;
    });
  };

  // Determine which files to display
  const filesToDisplay = searchKeyword
    ? files.filter(
        (file) =>
          (file.text || "")
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          (file.name || "").toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : files; // Show all files when searchKeyword is empty

  return (
    <div className="mainContainer">
      {isLoadingFiles ? (
        <LoadingGear isVisible={true} />
      ) : (
        <>
          <div className="bgText">
            <h2>
              Chap<span className="book">book</span>
            </h2>
          </div>
          <div className="mainScreen">
            {selectedFile ? (
              <FileViewScreen
                file={selectedFile}
                onBack={handleBackToDisplay}
                onUpdateFile={handleUpdateFile}
              />
            ) : (
              <>
                <FileDisplayScreen
                  files={filesToDisplay}
                  onViewFile={handleViewFile}
                  handleDeleteFile={handleDeleteFile}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
