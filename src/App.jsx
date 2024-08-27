import React, { useState } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [folderName, setFolderName] = useState("No Folder Selected");

  function handleToggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <>
      {showSidebar && (
        <Sidebar
          setFiles={setFiles}
          folderName={folderName}
          setFolderName={setFolderName}
          files={files}
          setFilteredFiles={setFilteredFiles}
        />
      )}
      <Main
        showSidebar={showSidebar}
        handleToggleSidebar={handleToggleSidebar}
        files={filteredFiles.length > 0 ? filteredFiles : files}
      />
    </>
  );
}

export default App;
