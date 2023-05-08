import { DOMParser } from 'xmldom';
import mammoth from 'mammoth';

export async function convertDocToText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const docxFile = new Uint8Array(arrayBuffer);
  const { value } = await mammoth.convertToHtml({ arrayBuffer: docxFile });

  const parser = new DOMParser();
  const doc = parser.parseFromString(value, 'text/html');
  const text = doc.documentElement.textContent;

  return text;
}
