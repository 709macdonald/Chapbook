import React, { useState, useEffect } from "react";
import LoadingGear from "./LoadingGear";
import FileDisplayScreen from "./FileDisplayScreen";
import FileViewScreen from "./FileViewScreen";

export default function Main({ files, setFiles, isLoadingFiles }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handles viewing a selected file
  const handleViewFile = (file) => {
    setSelectedFile(file);
  };

  // Handles going back to the file display screen
  const handleBackToDisplay = () => {
    setSelectedFile(null);
  };

  // Handles updating files (for example, when tags are added or removed)
  const handleUpdateFile = (updateFn) => {
    setFiles((prevFiles) => {
      const updatedFiles = updateFn(prevFiles);

      // After updating the files array, find the updated selected file and set it
      const updatedSelectedFile = updatedFiles.find(
        (f) => f.url === selectedFile.url
      );
      setSelectedFile(updatedSelectedFile); // Ensure selectedFile is updated

      console.log("Updated files array:", updatedFiles); // Log the updated files array for debugging
      return updatedFiles;
    });
  };

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
                onUpdateFile={handleUpdateFile} // Pass handleUpdateFile for adding/removing tags
              />
            ) : (
              <FileDisplayScreen
                files={files}
                onViewFile={handleViewFile} // Pass the function to view the file
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
