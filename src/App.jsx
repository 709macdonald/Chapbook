import { useState } from "react";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  const [showSidebar, setShowSidebar] = useState(true);

  function handleToggleSidebar() {
    setShowSidebar(!showSidebar);
  }

  return (
    <>
      {showSidebar && <Sidebar />}
      <Main
        showSidebar={showSidebar}
        handleToggleSidebar={handleToggleSidebar}
      />
    </>
  );
}

export default App;
