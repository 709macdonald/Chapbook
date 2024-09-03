import React, { useState } from "react";
import FileLister from "./FileLister";

const FileManager = ({ setFiles, setFolderName, setIsLoadingFiles }) => {
  const [files, setFilesState] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFilesState(selectedFiles);

    if (selectedFiles.length > 0) {
      const folderPath = selectedFiles[0].webkitRelativePath
        ? selectedFiles[0].webkitRelativePath.split("/")[0]
        : "Selected Files";
      setFolderName(folderPath);
    }
  };

  return (
    <div className="documentSection">
      <div className="documentSectionDiv">
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf"
          multiple
          webkitdirectory=""
          directory=""
          className="fileInput"
          id="fileInput"
        />
        <label htmlFor="fileInput" className="fileInputLabel">
          <i className="fa-solid fa-folder"></i>
        </label>
        <label htmlFor="fileInput" id="fileInputText">
          Choose Folder or Files
        </label>
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
