import React, { useState } from "react";

const FileManager = ({ setFiles }) => {
  const [directoryHandle, setDirectoryHandle] = useState(null);

  const openFolder = async () => {
    if ("showDirectoryPicker" in window) {
      try {
        const handle = await window.showDirectoryPicker();
        setDirectoryHandle(handle);
        await listFiles(handle);
      } catch (error) {
        console.error("Error opening folder:", error);
      }
    } else {
      console.error("File System Access API is not supported in this browser.");
    }
  };

  const uploadFiles = async (event) => {
    if (directoryHandle) {
      try {
        const selectedFiles = Array.from(event.target.files);
        for (const file of selectedFiles) {
          const fileHandle = await directoryHandle.getFileHandle(file.name, {
            create: true,
          });
          const writableStream = await fileHandle.createWritable();
          await writableStream.write(file);
          await writableStream.close();
        }
        await listFiles(directoryHandle);
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    } else {
      console.log("No folder selected.");
    }
  };

  const listFiles = async (handle) => {
    const fileArray = [];
    for await (const entry of handle.values()) {
      fileArray.push(entry.name);
    }
    setFiles(fileArray);
  };

  return (
    <div className="documentSection">
      <div className="documentSectionDiv">
        <input
          type="file"
          id="uploadFile"
          multiple
          style={{ display: "none" }}
          onChange={uploadFiles}
        />
        <button
          onClick={() => document.getElementById("uploadFile").click()}
          className="fileButtons"
        >
          <i className="fa-solid fa-file-circle-plus fileIcon"></i>
        </button>
        <label htmlFor="uploadFile">Upload Document</label>
      </div>
      <div className="documentSectionDiv">
        <button onClick={openFolder} className="fileButtons">
          <i className="fa-solid fa-folder-open fileIcon"></i>
        </button>
        <label htmlFor="fileDirectory">Choose Folder</label>
      </div>
    </div>
  );
};

export default FileManager;
