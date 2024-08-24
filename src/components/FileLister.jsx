// FileLister.jsx
import React, { useEffect } from "react";

const FileLister = ({ handle, setFiles }) => {
  useEffect(() => {
    const listFiles = async () => {
      const fileArray = [];
      for await (const entry of handle.values()) {
        fileArray.push(entry.name);
      }
      setFiles(fileArray);
    };

    if (handle) {
      listFiles();
    }
  }, [handle, setFiles]);

  return null; // This component does not need to render anything itself
};

export default FileLister;
