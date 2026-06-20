import pdfParse from "pdf-parse";
import mammoth from "mammoth";

/**
 * Extracts plain text from an uploaded resume file buffer.
 * Supports PDF and DOCX. Throws a descriptive error for anything else.
 */
export const extractText = async (buffer, mimeType, fileName = "") => {
  const lowerName = fileName.toLowerCase();

  const isPdf = mimeType === "application/pdf" || lowerName.endsWith(".pdf");
  const isDocx =
    mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lowerName.endsWith(".docx");

  if (isPdf) {
    const data = await pdfParse(buffer);
    return data.text.trim();
  }

  if (isDocx) {
    const { value } = await mammoth.extractRawText({ buffer });
    return value.trim();
  }

  throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
};