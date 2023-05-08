import React, { FC, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface QuillEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const QuillEditor: FC<QuillEditorProps> = ({ content, onChange }) => {
  const [isClient, setIsClient] = useState(false);
  const quillRef = useRef<any>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    if (isClient) {
      import('quill').then((QuillModule) => {
        const Quill = QuillModule.default;
        if (editorRef.current) {
          quillRef.current = new Quill(editorRef.current, {
            theme: 'snow',
          });

          quillRef.current.clipboard.dangerouslyPasteHTML(content);

          quillRef.current.on('text-change', () => {
            onChange(quillRef.current.root.innerHTML);
          });
        }
      });
    }
  }, [isClient]);

  useEffect(() => {
    if (quillRef.current) {
      quillRef.current.clipboard.dangerouslyPasteHTML(content);
    }
  }, [content]);

  return (
    <div ref={editorRef} />
  );
};

export default QuillEditor;
