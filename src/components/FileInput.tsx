import { ChangeEvent, FC } from 'react';

interface FileInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FC<FileInputProps> = ({ onChange }) => (
  <input type="file" accept=".docx" onChange={onChange} />
);

export default FileInput;
