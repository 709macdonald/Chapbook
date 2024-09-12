import React, { useState } from "react";
import LoadingGear from "./LoadingGear";
import FileDisplayScreen from "./FileDisplayScreen";
import FileViewScreen from "./FileViewScreen";

export default function Main({ files, isLoadingFiles }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleViewFile = (file) => {
    setSelectedFile(file); // Set the selected file
  };

  const handleBackToDisplay = () => {
    setSelectedFile(null); // Reset to show FileDisplayScreen
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
              />
            ) : (
              <FileDisplayScreen files={files} onViewFile={handleViewFile} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
