import React, { useEffect } from "react";
import pdfToText from "react-pdftotext";

const FileLister = ({ files, setFiles }) => {
  useEffect(() => {
    const listFiles = async () => {
      for (const file of files) {
        const url = URL.createObjectURL(file);

        try {
          const pdfText = await extractTextFromPDF(file);
          setFiles((prevFiles) => [
            ...prevFiles,
            { name: file.name, url, text: pdfText || "" },
          ]);
        } catch (error) {
          alert(`Failed to extract text from PDF file: ${file.name}`);
          console.error(`Failed to extract text from ${file.name}:`, error);
          setFiles((prevFiles) => [
            ...prevFiles,
            { name: file.name, url, text: "" },
          ]);
        }
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
