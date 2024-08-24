import React, { useState } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [files, setFiles] = useState([]);

  function handleToggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <>
      {showSidebar && <Sidebar setFiles={setFiles} />}
      <Main
        showSidebar={showSidebar}
        handleToggleSidebar={handleToggleSidebar}
        files={files}
      />
    </>
  );
}

export default App;
