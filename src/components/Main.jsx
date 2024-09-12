import React from "react";
import LoadingGear from "./LoadingGear";
import FileDisplayScreen from "./FileDisplayScreen";

export default function Main({ files, isLoadingFiles }) {
  return (
    <div className="mainContainer">
      {isLoadingFiles ? (
        <LoadingGear isVisible={true} />
      ) : (
        <>
          <div className="bgText">
            <h2>
              Chap<span className="book">book</span>
            </h2>
          </div>
          <div className="mainScreen">
            <FileDisplayScreen files={files} />
          </div>
        </>
      )}
    </div>
  );
}
