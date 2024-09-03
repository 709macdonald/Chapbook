import React from "react";

function LoadingGear({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="loadingScreen">
      <i className="fa-solid fa-gear loadingGear"></i>
      <p className="loadingText">Loading your documents...</p>
    </div>
  );
}

export default LoadingGear;
