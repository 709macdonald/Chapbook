import React, { useState } from "react";
import LoadingGear from "./LoadingGear";
import FileDisplayScreen from "./FileDisplayScreen";
import FileViewScreen from "./FileViewScreen";

export default function Main({ files, setFiles, isLoadingFiles }) {
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
      console.log("Updated files array:", updatedFiles); // Log the updated files array
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
                onUpdateFile={handleUpdateFile} // Pass handleUpdateFile
              />
            ) : (
              <FileDisplayScreen
                files={files}
                file={selectedFile}
                onViewFile={handleViewFile}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
