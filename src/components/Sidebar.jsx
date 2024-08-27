import React from "react";
import FileManager from "./FileManager";

export default function Sidebar({ setFiles, folderName, setFolderName }) {
  return (
    <div className="sidebarBG">
      <div className="searchParameters">
        <FileManager setFiles={setFiles} setFolderName={setFolderName} />
        <p className="folderName">{folderName}</p>
        <div className="searchField">
          <input type="text" id="searchBar" placeholder="Search for Keywords" />
          <button className="searchButton">
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
