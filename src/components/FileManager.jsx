import React, { useState } from "react";
import FileLister from "./FileLister";

const FileManager = ({ setFiles, setFolderName }) => {
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
        />
        <label htmlFor="fileInput">Choose Folder or Files</label>
      </div>
      {files.length > 0 && <FileLister files={files} setFiles={setFiles} />}
    </div>
  );
};

export default FileManager;
