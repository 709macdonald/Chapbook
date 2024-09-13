import React, { useState } from "react";
import LoadingGear from "./LoadingGear";
import FileDisplayScreen from "./FileDisplayScreen";
import FileViewScreen from "./FileViewScreen";

export default function Main({ files, isLoadingFiles }) {
  const [selectedFile, setSelectedFile] = useState(null); // State to track selected file

  const handleViewFile = (file) => {
    setSelectedFile(file); // Set the selected file for viewing
  };

  const handleBackToDisplay = () => {
    setSelectedFile(null); // Reset the selected file when going back
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
                onBack={handleBackToDisplay} // Pass the back function
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
