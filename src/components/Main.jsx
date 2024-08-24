import React from "react";

export default function Main({ files, handleToggleSidebar }) {
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
                {file}
              </div>
            ))
          ) : (
            <p>No files to display</p>
          )}
        </div>
      </div>
      <div className="menuIcon">
        <button onClick={handleToggleSidebar} className="menuButton">
          <i className="fa-solid fa-bars icon-large"></i>
        </button>
      </div>
    </div>
  );
}
