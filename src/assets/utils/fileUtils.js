import { extractTextFromPDF } from "./pdfUtils";
import { extractTextFromImage } from "./imageUtils";
import { extractTextFromWordDoc } from "./wordUtils"; // Import word extraction

export const processFiles = async (files) => {
  const processedFiles = [];

  for (const file of files) {
    const url = URL.createObjectURL(file); // Keep the blob URL for later viewing

    try {
      let fileData = {
        id: Date.now() + Math.random(), // Generate a unique ID
        name: file.name,
        url, // Store the blob URL but don't trigger downloads
        type: file.type,
        fileObject: file,
        text: "",
        matchedWords: [],
        tags: [], // Initialize tags as an empty array
      };

      if (file.type === "application/pdf") {
        fileData.text = await extractTextFromPDF(file);
      } else if (file.type.startsWith("image/")) {
        fileData.text = await extractTextFromImage(file);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        fileData.text = await extractTextFromWordDoc(file); // Handle Word files
      }

      processedFiles.push(fileData);
    } catch (error) {
      alert(`Failed to extract text from file: ${file.name}`);
      console.error(`Failed to extract text from ${file.name}:`, error);
      processedFiles.push({
        id: Date.now() + Math.random(), // Still generate a unique ID even on failure
        name: file.name,
        url, // Still store the URL even on failure
        type: file.type,
        fileObject: file,
        text: "",
        tags: [], // Initialize tags as an empty array
      });
    }
  }

  console.log(processedFiles);
  return processedFiles;
};
