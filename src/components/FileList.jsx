import React from "react";

const FileList = ({ files }) => {
  return (
    <div className="fileList">
      {files.length > 0 ? (
        files.map((file, index) => (
          <div key={index} className="fileDisplay">
            <i className="fa-regular fa-file-pdf pdfIcon"></i>
            <p className="pdfText">{file}</p>
          </div>
        ))
      ) : (
        <p>No files to display</p>
      )}
    </div>
  );
};

export default FileList;
