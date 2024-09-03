import Tesseract from "tesseract.js";

export const extractTextFromImage = (file) => {
  return new Promise((resolve, reject) => {
    Tesseract.recognize(file, "eng")
      .then(({ data: { text } }) => resolve(text))
      .catch(reject);
  });
};
