import React from "react";
import FileManager from "./FileManager";

export default function Sidebar({ setFiles }) {
  return (
    <div className="sidebarBG">
      <div className="searchParameters">
        <FileManager setFiles={setFiles} />
        <p className="folderName">No Folder Selected</p>
        <div className="searchField">
          <input
            type="text"
            id="searchBar"
            placeholder="Search for Keywords"
          ></input>
          <button className="searchButton">
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
          </button>
        </div>
        <div className="checkBoxDiv">
          <div className="checkbox">
            <input type="checkbox" checked id="searchPDF" readOnly></input>
            <label htmlFor="searchPDF">Search PDF</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked id="searchWord" readOnly></input>
            <label htmlFor="searchWord">Search Word Docs</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked id="searchImages" readOnly></input>
            <label htmlFor="searchImages">Search Images</label>
          </div>
          <div className="checkbox">
            <input type="checkbox" checked id="searchPages" readOnly></input>
            <label htmlFor="searchPages">Search Pages Docs</label>
          </div>
        </div>
      </div>
    </div>
  );
}
