import React from "react";
import FileList from "./FileList";

export default function Main({ files, handleToggleSidebar }) {
  return (
    <div className="mainContainer">
      <div className="bgText">
        <h2>
          Chap<span className="book">book</span>
        </h2>
      </div>
      <div className="mainScreen">
        <FileList files={files} />
      </div>
      <div className="menuIcon">
        <button onClick={handleToggleSidebar} className="menuButton">
          <i className="fa-solid fa-bars icon-large"></i>
        </button>
      </div>
    </div>
  );
}
