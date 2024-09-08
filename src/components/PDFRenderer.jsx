import React, { useRef, useEffect } from "react";
import { getDocument } from "pdfjs-dist";

const PDFRenderer = ({ file }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderPDF = async () => {
      if (file && canvasRef.current) {
        try {
          // Fetch the blob URL and convert it to ArrayBuffer
          const response = await fetch(file.url);
          const arrayBuffer = await response.arrayBuffer();

          // Use PDF.js to render the PDF
          const pdf = await getDocument({ data: arrayBuffer }).promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport,
          };

          await page.render(renderContext).promise;
          console.log("PDF rendered successfully.");
        } catch (error) {
          console.error("Error rendering PDF:", error);
        }
      }
    };

    renderPDF();
  }, [file]);

  return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
};

export default PDFRenderer;
