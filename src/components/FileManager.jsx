import React, { useState } from "react";
import FileLister from "./FileLister"; // Import the new component

const FileManager = ({ setFiles }) => {
  const [directoryHandle, setDirectoryHandle] = useState(null);

  const openFolder = async () => {
    if ("showDirectoryPicker" in window) {
      try {
        const handle = await window.showDirectoryPicker();
        setDirectoryHandle(handle);
      } catch (error) {
        console.error("Error opening folder:", error);
      }
    } else {
      console.error("File System Access API is not supported in this browser.");
    }
  };

  return (
    <div className="documentSection">
      <div className="documentSectionDiv">
        <button onClick={openFolder} className="fileButtons">
          <i className="fa-solid fa-folder-open fileIcon"></i>
        </button>
        <label htmlFor="fileDirectory">Choose Folder</label>
      </div>
      {/* Render the FileLister component */}
      {directoryHandle && (
        <FileLister handle={directoryHandle} setFiles={setFiles} />
      )}
    </div>
  );
};

export default FileManager;
