import pdfToText from "react-pdftotext";

export const extractTextFromPDF = (file) => {
  return new Promise((resolve, reject) => {
    pdfToText(file)
      .then((text) => resolve(text))
      .catch(reject);
  });
};
