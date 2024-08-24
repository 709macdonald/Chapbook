import React, { useEffect, useRef } from "react";

const FileLister = ({ handle, setFiles }) => {
  const hasLogged = useRef(false);

  useEffect(() => {
    const listFiles = async () => {
      const fileArray = [];
      for await (const entry of handle.values()) {
        if (entry.kind === "file") {
          const file = await entry.getFile();
          const url = URL.createObjectURL(file);
          fileArray.push({
            name: file.name,
            url: url,
          });
        }
      }
      setFiles(fileArray);

      if (!hasLogged.current) {
        console.log(fileArray);
        hasLogged.current = true;
      }
    };

    if (handle) {
      listFiles();
    }
  }, [handle, setFiles]);

  return null;
};

export default FileLister;
