"use client";
import { useState } from "react";
import '/app/globals.css';

export default function CreateBox() {
  // State to track the visibility of the form
  const [isFormVisible, setIsFormVisible] = useState(false);

  // State to track the form input
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  // Function to handle text input change
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  // Function to handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Handle form submission (e.g., send data to the server)
    alert("Form Submitted!");
    console.log("Text Submitted:", text);
    console.log("File Submitted:", file);

    // Optionally, clear the form after submission
    setText("");
    setFile(null);
  };

  return (
    <main className="bg-[#f5f8fa] h-screen flex flex-col items-center justify-center font-sans p-4">
      {/* Button to toggle form visibility */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 mb-4 transition ease-in-out duration-300"
      >
        {isFormVisible ? "Hide Form" : "Create New Post"}
      </button>

      {/* Form for submitting content, visible when isFormVisible is true */}
      {isFormVisible && (
        <div className="p-4 rounded-lg w-full sm:w-2/3 md:w-1/3 max-w-md bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Post Something New</h2>

          {/* Form for submitting text and file */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Text Area */}
            <textarea
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              rows="4"
              placeholder="What's on your mind?"
              value={text}
              onChange={handleTextChange}
            />

            {/* File Upload */}
            <input
              type="file"
              className="w-full p-2 rounded-lg border border-gray-300 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              onChange={handleFileChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300"
            >
              Submit Post
            </button>
          </form>
        </div>
      )}

      {/* Displaying submitted content */}
      {text && (
        <div className="mt-6 p-4 rounded-lg text-gray-800 w-full sm:w-2/3 md:w-1/3 max-w-md bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
          <h3 className="text-lg font-semibold mb-3">Your Post</h3>
          <div>
            <p>{text}</p>
          </div>
          {file && (
            <div className="mt-3">
              <h4 className="text-sm">Uploaded File:</h4>
              <img
                src={URL.createObjectURL(file)}
                alt="Submitted file preview"
                className="mt-3 max-w-full rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
