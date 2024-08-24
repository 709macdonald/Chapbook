// FileList.jsx
import React from "react";

const FileList = ({ files }) => {
  return (
    <div className="fileList">
      {files.length > 0 ? (
        files.map((file, index) => (
          <div key={index} className="fileDisplay">
            {file}
          </div>
        ))
      ) : (
        <p>No files to display</p>
      )}
    </div>
  );
};

export default FileList;
