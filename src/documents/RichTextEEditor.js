import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = () => {
  const [description, setDiscription] = useState("");

  return (
    <div>
      <ReactQuill
        value={description}
        onChange={setDiscription}
        placeholder="Enter description"
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline'],        // Text styling
            [{ 'indent': '-1'}, { 'indent': '+1' }], // Indentation
          ]
        }}
      />
    </div>
  );
};

export default RichTextEditor;