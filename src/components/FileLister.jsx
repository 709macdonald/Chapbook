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

  return null;
};

export default FileLister;
