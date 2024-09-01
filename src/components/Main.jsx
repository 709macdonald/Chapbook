import React from "react";
import FileList from "./FileList";

export default function Main({ files }) {
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
    </div>
  );
}
