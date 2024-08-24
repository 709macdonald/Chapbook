import React, { useState } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import FileManager from "./components/FileManager"; // Ensure this import is correct

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [files, setFiles] = useState([]);

  function handleToggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <>
      {showSidebar && <Sidebar files={files} setFiles={setFiles} />}
      <Main
        showSidebar={showSidebar}
        handleToggleSidebar={handleToggleSidebar}
        files={files}
      />
      <FileManager setFiles={setFiles} />{" "}
      {/* Ensure FileManager is used correctly */}
    </>
  );
}

export default App;
