import React, { useState } from "react";
import FileLister from "./FileLister";

const FileManager = ({ setFiles, setFolderName, setIsLoadingFiles }) => {
  const [files, setFilesState] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFilesState((prevFiles) => [...prevFiles, ...selectedFiles]); // Accumulate files

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
        {/* Input for selecting individual files (PDFs and images) */}
        <input
          type="file"
          onChange={handleFileChange}
          accept="application/pdf, image/*" // Accept PDFs and all image types
          multiple
          className="fileInput"
          id="fileInputFiles"
        />
        <label htmlFor="fileInputFiles" className="fileInputLabel">
          <i className="fa-solid fa-file"></i> Select Files
        </label>

        {/* Input for selecting directories */}
        <input
          type="file"
          onChange={handleFileChange}
          webkitdirectory="" // Allows folder selection
          className="fileInput"
          id="fileInputDirectory"
        />
        <label htmlFor="fileInputDirectory" className="fileInputLabel">
          <i className="fa-solid fa-folder"></i> Select Folder
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
