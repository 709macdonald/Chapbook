import React, { useState } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [files, setFiles] = useState([]);
  const [folderName, setFolderName] = useState("No Folder Selected"); // Manage folderName here

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
        />
      )}
      <Main
        showSidebar={showSidebar}
        handleToggleSidebar={handleToggleSidebar}
        files={files}
      />
    </>
  );
}

export default App;
