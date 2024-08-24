import React from "react";
import FileManager from "./FileManager";

export default function Sidebar({ setFiles }) {
  return (
    <div className="sidebarBG">
      <div className="searchParameters">
        <FileManager setFiles={setFiles} />
        <p>No File Selected</p>
        <div className="searchField">
          <button className="searchButton">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
          <input
            type="text"
            id="searchBar"
            placeholder="Search for Keywords"
          ></input>
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
