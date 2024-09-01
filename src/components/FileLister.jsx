import React, { useEffect } from "react";
import pdfToText from "react-pdftotext";

const FileLister = ({ files, setFiles }) => {
  useEffect(() => {
    const listFiles = async () => {
      const processedFiles = [];

      for (const file of files) {
        const url = URL.createObjectURL(file);

        try {
          const pdfText = await extractTextFromPDF(file);
          const fileData = { name: file.name, url, text: pdfText || "" };
          processedFiles.push(fileData);
        } catch (error) {
          alert(`Failed to extract text from PDF file: ${file.name}`);
          console.error(`Failed to extract text from ${file.name}:`, error);
          processedFiles.push({ name: file.name, url, text: "" });
        }
      }

      // Update the state with the final array of processed files
      setFiles(processedFiles);

      // Log the final array of files
      console.log("Final array of files:", processedFiles);
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
