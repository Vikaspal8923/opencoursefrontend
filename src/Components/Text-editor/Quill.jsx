import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const toolbarOptions = [
  [{ size: ["small", false, "large", "huge"] }],
  [{ list: "ordered" }, { list: "bullet" }],
];

const Editor = ({ setContent }) => {
  const [content, setLocalContent] = useState("");

  const handleChange = (value) => {
    setLocalContent(value);
    setContent(value);
  };

  return (
    <div className="w-full max-w-[full] mx-auto p-3 sm:p-4 mt-4 sm:mt-8 shadow-lg rounded-lg">
      <div className="p-2 w-full h-full rounded-lg bg-gray-200 overflow-hidden">
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={{ toolbar: toolbarOptions }}
          placeholder="Write your content here..."
          theme="snow"
          className="min-h-[200px] sm:min-h-[250px]" // Improved responsiveness
        />
      </div>
    </div>
  );
};

export default Editor;
