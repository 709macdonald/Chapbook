import React from "react";
import LoadingGear from "./LoadingGear";
import PDFRenderer from "./PDFRenderer";

export default function Main({ files, isLoadingFiles }) {
  const filesWithText = React.useMemo(() => {
    return files.filter((file) => file.text.trim() !== "");
  }, [files]);

  const isPdf = (file) => file.type === "application/pdf";
  const isImage = (file) => file.type.startsWith("image/");

  console.log(files);

  return (
    <div className="mainContainer">
      {/* Show LoadingGear if isLoadingFiles is true */}
      {isLoadingFiles ? (
        <LoadingGear isVisible={true} />
      ) : (
        <>
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
                    {file.url ? (
                      <iframe
                        src={file.url}
                        title={file.name}
                        style={{ width: "9rem", height: "12rem" }}
                        onError={(e) => (e.target.style.display = "none")}
                      ></iframe>
                    ) : isPdf(file) ? (
                      <i className="fa-regular fa-file-pdf pdfIcon"></i>
                    ) : isImage(file) ? (
                      <i className="fa-regular fa-file-image imageIcon"></i>
                    ) : (
                      <i className="fa-regular fa-file"></i>
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

                      {file.url && (
                        <a
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="fileView"
                        >
                          View File
                        </a>
                      )}
                      {/* Render PDFRenderer component */}
                      {/* isPdf(file) && <PDFRenderer file={file} /> */}
                    </div>
                  </div>
                ))
              ) : (
                <p className="noFilesDisplay">No files to display</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
