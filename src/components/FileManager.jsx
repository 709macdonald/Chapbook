import React, { useState } from "react";
import { processFiles } from "../assets/utils/fileUtils";

const FileManager = ({
  setFiles,
  setFolderName,
  setIsLoadingFiles,
  folderName,
}) => {
  const [files, setFilesState] = useState([]);

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFilesState((prevFiles) => [...prevFiles, ...selectedFiles]);

    if (selectedFiles.length > 0) {
      const folderPath = selectedFiles[0].webkitRelativePath
        ? selectedFiles[0].webkitRelativePath.split("/")[0]
        : "Selected Files";
      setFolderName(folderPath);
    }

    if (selectedFiles.length > 0) {
      setIsLoadingFiles(true);
      const processedFiles = await processFiles(selectedFiles);
      setFiles(processedFiles);
      setIsLoadingFiles(false);
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
          <i className="fa-solid fa-file folderIcon"></i> Select Files
        </label>

        <input
          type="file"
          onChange={handleFileChange}
          webkitdirectory=""
          className="fileInput"
          id="fileInputDirectory"
        />
        <label htmlFor="fileInputDirectory" className="fileInputLabel">
          <i className="fa-solid fa-folder folderIcon"></i> Select Folder
        </label>
        <p className="folderName">{folderName}</p>
        <button onClick={handleReset} className="resetButton">
          Reset
        </button>
      </div>
    </div>
  );
};

export default FileManager;
