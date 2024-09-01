import React from "react";

export default function Main({ files }) {
  return (
    <div className="mainContainer">
      <div className="bgText">
        <h2>
          Chap<span className="book">book</span>
        </h2>
      </div>
      <div className="mainScreen">
        <div className="fileList">
          {files.length > 0 ? (
            files.map((file, index) => (
              <div key={index} className="fileDisplay">
                <i className="fa-regular fa-file-pdf pdfIcon"></i>
                <p className="pdfText">{file.name}</p>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  View File
                </a>
              </div>
            ))
          ) : (
            <p>No files to display</p>
          )}
        </div>
      </div>
    </div>
  );
}
