import React from "react";

export default function Main({ files }) {
  // Filter out files with empty text
  const filesWithText = React.useMemo(() => {
    return files.filter((file) => file.text.trim() !== "");
  }, [files]);

  return (
    <div className="mainContainer">
      <div className="bgText">
        <h2>
          Chap<span className="book">book</span>
        </h2>
      </div>
      <div className="mainScreen">
        <div className="fileList">
          {filesWithText.length > 0 ? (
            filesWithText.map((file) => (
              <div key={file.url} className="fileDisplay">
                <i className="fa-regular fa-file-pdf pdfIcon"></i>
                <p className="pdfText">{file.name}</p>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  View File
                </a>
              </div>
            ))
          ) : (
            <p>No files with text to display</p>
          )}
        </div>
      </div>
    </div>
  );
}
