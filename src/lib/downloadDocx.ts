import { Document, Packer, Paragraph, TextRun } from 'docx';

export async function downloadDocx(html: string) {
  const doc = new Document(
    {
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        children: [
                            new TextRun("Hello World"),
                            new TextRun({
                                text: "Foo Bar",
                                bold: true,
                            }),
                            new TextRun({
                                text: "\tGithub is the best",
                                bold: true,
                            }),
                        ],
                    }),
                ],
            },
        ],
    }
)


  // Use a simple regex to extract the text content inside the <p> tags
  const paragraphs = html.match(/<p>(.*?)<\/p>/g)?.map(paragraph => {
    const content = paragraph.replace(/(<([^>]+)>)/gi, '');
    return new Paragraph(content);
  });

  /*

  if (paragraphs) {
    doc.addSection({
      children: paragraphs,
    });
  }
    */

  const blob = await Packer.toBlob(doc);
  saveAs(blob, 'output.docx');
}

function saveAs(blob: Blob, filename: string) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
