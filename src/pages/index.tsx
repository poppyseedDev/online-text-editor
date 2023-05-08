import { useState } from 'react';
import { convertDocToText } from '@/lib/convertDocToText';
import FileInput from '@/components/FileInput';
import QuillEditor from '@/components/QuillEditor';

const Home = () => {
  const [content, setContent] = useState('');
  const [modifiedContent, setModifiedContent] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await convertDocToText(file);
      setContent(text);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center my-8">Doc File Editor</h1>
      <div className="flex justify-center mb-8">
        <FileInput onChange={handleFileChange} />
      </div>
      <QuillEditor content={content} onChange={setModifiedContent} />
    </div>
  );
};

export default Home;