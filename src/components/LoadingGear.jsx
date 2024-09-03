import React from "react";

function LoadingGear({ isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="loadingScreen">
      <i className="fa-solid fa-gear loadingGear"></i>
    </div>
  );
}

export default LoadingGear;
