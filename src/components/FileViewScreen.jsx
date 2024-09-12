import React from "react";

export default function FileViewScreen({ file, onBack }) {
  return (
    <div className="fileViewScreen">
      <button className="backButton" onClick={onBack}>
        Back to Files
      </button>
      {file.type === "application/pdf" || file.type.startsWith("image/") ? (
        <iframe
          src={file.url}
          title={file.name}
          style={{ width: "100%", height: "90vh" }}
        ></iframe>
      ) : (
        <p>File format not supported for inline view.</p>
      )}
    </div>
  );
}
