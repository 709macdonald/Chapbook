import React, { useState } from "react";
import FileLister from "./FileLister";

const FileManager = ({ setFiles, setFolderName, setIsLoadingFiles }) => {
  const [files, setFilesState] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFilesState((prevFiles) => [...prevFiles, ...selectedFiles]);

    if (selectedFiles.length > 0) {
      const folderPath = selectedFiles[0].webkitRelativePath
        ? selectedFiles[0].webkitRelativePath.split("/")[0]
        : "Selected Files";
      setFolderName(folderPath);
    }
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to clear all files from Chapbook's library?"
    );

    if (confirmReset) {
      setFilesState([]);
      setFiles([]);
      setFolderName("");
      setIsLoadingFiles(false);
    }
  };

  return (
    <div className="documentSection">
      <div className="documentSectionDiv">
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf, image/*"
          multiple
          className="fileInput"
          id="fileInputFiles"
        />
        <label htmlFor="fileInputFiles" className="fileInputLabel">
          <i className="fa-solid fa-file"></i> Select Files
        </label>

        <input
          type="file"
          onChange={handleFileChange}
          webkitdirectory=""
          className="fileInput"
          id="fileInputDirectory"
        />
        <label htmlFor="fileInputDirectory" className="fileInputLabel">
          <i className="fa-solid fa-folder"></i> Select Folder
        </label>
        <button onClick={handleReset} className="resetButton">
          Reset
        </button>
      </div>
      {files.length > 0 && (
        <FileLister
          files={files}
          setFiles={setFiles}
          setIsLoadingFiles={setIsLoadingFiles}
        />
      )}
    </div>
  );
};

export default FileManager;
