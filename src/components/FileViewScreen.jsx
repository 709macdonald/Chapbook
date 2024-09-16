import React, { useState } from "react";

export default function FileViewScreen({ file, onBack, onUpdateFile }) {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (!file || !file.tags) {
      console.error("File or file.tags is undefined");
      return;
    }

    if (typeof onUpdateFile !== "function") {
      console.error("onUpdateFile is not a function");
      return;
    }

    onUpdateFile((prevFiles) =>
      prevFiles.map((f) => {
        if (f.url === file.url) {
          return {
            ...f,
            tags: [...(f.tags || []), newTag], // Append the new tag to the existing array of tags
          };
        }
        return f;
      })
    );

    setNewTag(""); // Clear the input field
  };

  const handleRemoveTag = (index) => {
    if (typeof onUpdateFile !== "function") {
      console.error("onUpdateFile is not a function");
      return;
    }

    onUpdateFile((prevFiles) =>
      prevFiles.map((f) => {
        if (f.url === file.url) {
          return {
            ...f,
            tags: (f.tags || []).filter((_, i) => i !== index), // Remove the tag at the specified index
          };
        }
        return f;
      })
    );
  };

  return (
    <div className="fileViewContainer">
      <button onClick={onBack} className="backButton">
        Back
      </button>
      <div className="fileDetails">
        <h3>{file.name}</h3>
        <p>
          Date Created: {new Date(file.lastModifiedDate).toLocaleDateString()}
        </p>
        <p>Word Count: {file.text.split(/\s+/).length}</p>
      </div>
      <iframe
        src={file.url}
        title={file.name}
        style={{ width: "100%", height: "80vh" }}
      ></iframe>
      <div className="tagsSection">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a tag"
        />
        <button onClick={handleAddTag}>Add Tag</button>
        <div className="tagsList">
          {(file.tags || []).map((tag, index) => (
            <div key={index}>
              {tag} <button onClick={() => handleRemoveTag(index)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
