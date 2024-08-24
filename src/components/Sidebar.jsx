import React from "react";
import FileManager from "./FileManager";

export default function Sidebar({ setFiles, folderName, setFolderName }) {
  return (
    <div className="sidebarBG">
      <div className="searchParameters">
        <div className="searchField">
          <input type="text" id="searchBar" placeholder="Search for Keywords" />
          <button className="searchButton">
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          </button>
        </div>
        <div className="checkBoxDiv">
          <div className="checkbox">
            <input type="checkbox" checked id="searchPDF" readOnly />
            <label htmlFor="searchPDF">Search PDF</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked id="searchWord" readOnly />
            <label htmlFor="searchWord">Search Word Docs</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked id="searchImages" readOnly />
            <label htmlFor="searchImages">Search Images</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked id="searchPages" readOnly />
            <label htmlFor="searchPages">Search Pages Docs</label>
          </div>
        </div>
        <FileManager setFiles={setFiles} setFolderName={setFolderName} />
        <p className="folderName">{folderName}</p>
      </div>
    </div>
  );
}
