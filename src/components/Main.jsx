import React from "react";

export default function Main(props) {
  const { showSidebar, handleToggleSidebar } = props;
  return (
    <div className="mainContainer">
      <div className="bgText">
        <h2>
          Chap<span className="book">book</span>
        </h2>
      </div>
      <div className="mainScreen"></div>
      <div className="menuIcon">
        <button onClick={handleToggleSidebar} className="menuButton">
          <i className="fa-solid fa-bars icon-large"></i>
        </button>
      </div>
    </div>
  );
}
