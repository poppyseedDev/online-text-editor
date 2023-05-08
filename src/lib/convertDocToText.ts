import mammoth from 'mammoth';

export async function convertFileToText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const docxFile = new Uint8Array(arrayBuffer);
  const { value } = await mammoth.convertToHtml({ arrayBuffer: docxFile });
  return value;
}
