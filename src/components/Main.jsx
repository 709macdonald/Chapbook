import React from "react";
import LoadingGear from "./LoadingGear";

export default function Main({ files, isLoading }) {
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
      <LoadingGear isVisible={isLoading} />
      <div className="mainScreen">
        <div className="fileList">
          {filesWithText.length > 0 ? (
            filesWithText.map((file) => (
              <div key={file.url} className="fileDisplay">
                {file.url ? (
                  <iframe
                    src={file.url}
                    title={file.name}
                    style={{ width: "9rem", height: "12rem" }}
                  ></iframe>
                ) : (
                  <i className="fa-regular fa-file-pdf pdfIcon"></i>
                )}
                <p className="pdfText">{file.name}</p>
                {file.url && (
                  <a href={file.url} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                )}
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
