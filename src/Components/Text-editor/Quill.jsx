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
    setContent(value); // Pass the raw HTML content to the parent
  };

  return (
    <div className="w-full sm:w-[500px] p-2 sm:p-4 mt-6 sm:mt-12 shadow-lg rounded-lg">
      {/* ReactQuill Editor */}
      <div className="p-1 rounded-lg bg-gray-200 overflow-hidden">
        <ReactQuill
          value={content}
          onChange={handleChange}
          modules={{ toolbar: toolbarOptions }}
          placeholder="Write your content here..."
          theme="snow"
          className="h-40 sm:h-52" // Adjust height for mobile
        />
      </div>
    </div>
  );
};

export default Editor;