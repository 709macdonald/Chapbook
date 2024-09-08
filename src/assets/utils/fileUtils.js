// src/assets/utils/fileUtils.js
import { extractTextFromPDF } from "./pdfUtils";
import { extractTextFromImage } from "./imageUtils";

export const processFiles = async (files) => {
  const processedFiles = [];

  for (const file of files) {
    const url = URL.createObjectURL(file);

    try {
      let fileData = {
        name: file.name,
        url,
        type: file.type,
        fileObject: file,
        text: "",
        matchedWords: [],
      };

      if (file.type === "application/pdf") {
        fileData.text = await extractTextFromPDF(file);
      } else if (file.type.startsWith("image/")) {
        fileData.text = await extractTextFromImage(file);
      }

      processedFiles.push(fileData);
    } catch (error) {
      alert(`Failed to extract text from file: ${file.name}`);
      console.error(`Failed to extract text from ${file.name}:`, error);
      processedFiles.push({
        name: file.name,
        url,
        type: file.type,
        fileObject: file,
        text: "",
      });
    }
  }

  console.log(processedFiles);

  return processedFiles;
};
