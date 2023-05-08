import { useState } from 'react';
import { convertFileToText } from '@/lib/convertDocToText';
import { downloadDocx } from '@/lib/downloadDocx';
import FileInput from '@/components/FileInput';
import QuillEditor from '@/components/QuillEditor';

const Home = () => {
  const [content, setContent] = useState('');
  const [modifiedContent, setModifiedContent] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await convertFileToText(file);
      setContent(text);
    }
  };

  const handleDownloadClick = () => {
    downloadDocx(content);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center my-8">Doc File Editor</h1>
      <div className="flex justify-center mb-8">
        <FileInput onChange={handleFileChange} />
      </div>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <button onClick={handleDownloadClick}>Download</button>
      <QuillEditor content={content} onChange={setModifiedContent} />
    </div>
  );
};

export default Home;