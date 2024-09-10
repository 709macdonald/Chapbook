import React, { useState, useEffect } from "react";

function LoadingGear({ isVisible }) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots === "...") return "";
        return prevDots + ".";
      });
    }, 500); // Adjust timing here if needed

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="loadingScreen">
      <i className="fa-solid fa-gear loadingGear"></i>
      <p className="loadingText">
        Loading your documents
        <span className="loadingDots">{dots}</span>
      </p>
    </div>
  );
}

export default LoadingGear;
