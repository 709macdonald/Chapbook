import React from "react";

export default function FileViewScreen({ file, onBack }) {
  const getWordCount = (text) => {
    return text ? text.split(/\s+/).length : 0;
  };

  const formattedDate = file.lastModifiedDate
    ? new Date(file.lastModifiedDate).toLocaleDateString()
    : "Unknown Date";

  const isPdf = file.type === "application/pdf";
  const isImage = file.type.startsWith("image/");
  const isWordDoc =
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  return (
    <div className="fileViewContainer">
      <button onClick={onBack} className="backButton">
        Back
      </button>
      <div className="fileDetails">
        <h3>{file.name}</h3>
        <p>Date Created: {formattedDate}</p>
        <p>Word Count: {getWordCount(file.text)}</p>
      </div>

      {/* Download Button */}
      <a href={file.url} download={file.name} className="downloadButton">
        Download File
      </a>

      {/* Conditionally render based on file type */}
      {isPdf || isImage ? (
        <iframe
          src={file.url}
          title={file.name}
          style={{ width: "100%", height: "80vh" }}
        ></iframe>
      ) : isWordDoc ? (
        <div className="wordDocText">
          <h4>Extracted Text:</h4>
          <p>{file.text}</p>
        </div>
      ) : (
        <p>Unsupported file type</p>
      )}
    </div>
  );
}
