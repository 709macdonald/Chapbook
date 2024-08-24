import React, { useEffect, useRef, useState } from "react";
import pdfToText from "react-pdftotext";

const FileLister = ({ handle, setFiles }) => {
  const hasLogged = useRef(false);

  useEffect(() => {
    const listFiles = async () => {
      const fileArray = [];
      for await (const entry of handle.values()) {
        if (entry.kind === "file") {
          const file = await entry.getFile();
          const url = URL.createObjectURL(file);

          const pdfText = await extractTextFromPDF(file);

          fileArray.push({
            name: file.name,
            url: url,
            text: pdfText,
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

  const extractTextFromPDF = (file) => {
    return new Promise((resolve, reject) => {
      pdfToText(file)
        .then((text) => resolve(text))
        .catch((error) => {
          console.error("Failed to extract text from PDF:", error);
          reject("");
        });
    });
  };

  return null;
};

export default FileLister;
