import React, { useEffect } from "react";
import { extractTextFromPDF } from "../assets/utils/pdfUtils";
import { extractTextFromImage } from "../assets/utils/imageUtils";

const FileLister = ({ files, setFiles, setIsLoadingFiles }) => {
  useEffect(() => {
    const listFiles = async () => {
      // Start loading
      setIsLoadingFiles(true);

      const processedFiles = [];

      for (const file of files) {
        const url = URL.createObjectURL(file);

        try {
          let fileData = { name: file.name, url, text: "" };

          if (file.type === "application/pdf") {
            fileData.text = await extractTextFromPDF(file);
          } else if (file.type.startsWith("image/")) {
            fileData.text = await extractTextFromImage(file);
          }

          processedFiles.push(fileData);
        } catch (error) {
          alert(`Failed to extract text from file: ${file.name}`);
          console.error(`Failed to extract text from ${file.name}:`, error);
          processedFiles.push({ name: file.name, url, text: "" });
        }
      }

      setFiles(processedFiles);
      console.log("Final array of files:", processedFiles);

      // Done loading
      setIsLoadingFiles(false);
    };

    if (files && files.length > 0) {
      listFiles();
    }
  }, [files, setFiles, setIsLoadingFiles]);

  return null;
};

export default FileLister;
