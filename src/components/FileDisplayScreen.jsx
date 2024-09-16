import React, { useState } from "react";

export default function FileDisplayScreen({ files, onViewFile }) {
  const filesWithText = React.useMemo(() => {
    return files.filter((file) => file.text.trim() !== "");
  }, [files]);

  const isPdf = (file) => file.type === "application/pdf";
  const isImage = (file) => file.type.startsWith("image/");
  const isWordDoc = (file) =>
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  const [renderErrors, setRenderErrors] = useState({});

  const handleRenderError = (fileUrl) => {
    setRenderErrors((prev) => ({ ...prev, [fileUrl]: true }));
  };

  return (
    <div className="fileList">
      {filesWithText.length > 0 ? (
        filesWithText.map((file) => (
          <div key={file.url} className="fileDisplay">
            {isPdf(file) ? (
              !renderErrors[file.url] ? (
                <iframe
                  src={file.url}
                  title={file.name}
                  style={{ width: "9rem", height: "12rem" }}
                  onError={() => handleRenderError(file.url)}
                ></iframe>
              ) : (
                <i className="fa-regular fa-file-pdf pdfIcon"></i>
              )
            ) : isImage(file) ? (
              !renderErrors[file.url] ? (
                <img
                  src={file.url}
                  alt={file.name}
                  style={{ width: "9rem", height: "12rem" }}
                  onError={() => handleRenderError(file.url)}
                />
              ) : (
                <i className="fa-regular fa-file-image imageIcon"></i>
              )
            ) : isWordDoc(file) ? (
              <i className="fa-regular fa-file-word wordIcon"></i>
            ) : (
              <i className="fa-regular fa-file wordIcon"></i>
            )}
            <div className="fileDisplayText">
              <p className="pdfText">{file.name}</p>
              <p className="matchedWords">
                {file.matchedWords.length > 0 ? (
                  <>
                    Found:{" "}
                    <span className="showMatchedWords">
                      {file.matchedWords.join(", ")}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </p>
              {isPdf(file) || isImage(file) || isWordDoc(file) ? (
                <button
                  onClick={() => onViewFile(file)} // View file for Word docs too
                  className="fileView"
                >
                  View File
                </button>
              ) : null}
            </div>
          </div>
        ))
      ) : (
        <p className="noFilesDisplay">No files to display</p>
      )}
    </div>
  );
}
