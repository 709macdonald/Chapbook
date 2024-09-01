import React, { useEffect, useRef } from "react";
import pdfToText from "react-pdftotext";

const FileLister = ({ files, setFiles }) => {
  const hasLogged = useRef(false);

  useEffect(() => {
    const listFiles = async () => {
      const fileArray = [];

      for (const file of files) {
        const url = URL.createObjectURL(file);

        try {
          const pdfText = await extractTextFromPDF(file);
          fileArray.push({
            name: file.name,
            url: url,
            text: pdfText || "",
          });
        } catch (error) {
          alert(`Failed to extract text from PDF file: ${file.name}`);
          console.error(`Failed to extract text from ${file.name}:`, error);
          fileArray.push({
            name: file.name,
            url: url,
            text: "",
          });
        }
      }

      setFiles(fileArray);

      if (!hasLogged.current) {
        console.log("FileArray:", fileArray);
        hasLogged.current = true;
      }
    };

    if (files && files.length > 0) {
      listFiles();
    }
  }, [files, setFiles]);

  const extractTextFromPDF = (file) => {
    return new Promise((resolve, reject) => {
      pdfToText(file)
        .then((text) => resolve(text))
        .catch(reject);
    });
  };

  return null;
};

export default FileLister;
