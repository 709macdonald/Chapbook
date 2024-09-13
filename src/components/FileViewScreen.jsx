import React from "react";

export default function FileViewScreen({ file, onBack }) {
  const getWordCount = (text) => {
    return text ? text.split(/\s+/).length : 0;
  };

  // Check if lastModifiedDate exists, use a fallback if it's undefined
  const formattedDate = file.lastModifiedDate
    ? new Date(file.lastModifiedDate).toLocaleDateString()
    : "Unknown Date";

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
      <iframe
        src={file.url}
        title={file.name}
        style={{ width: "100%", height: "80vh" }}
      ></iframe>
    </div>
  );
}
