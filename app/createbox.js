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
    <main className="bg-[#f5f8fa] h-screen flex flex-col items-center justify-center font-sans">
      {/* Button to toggle form visibility */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 mb-6 transition ease-in-out duration-300"
      >
        {isFormVisible ? "Hide Form" : "Create New Post"}
      </button>

      {/* Form for submitting content, visible when isFormVisible is true */}
      {isFormVisible && (
        <div className="bg-white p-6 rounded-lg w-3/4 sm:w-2/3 md:w-1/2 shadow-lg max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Post Something New</h2>

          {/* Form for submitting text and file */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Text Area */}
            <textarea
              className="w-full p-4 rounded-lg border border-gray-300 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              rows="5"
              placeholder="What's on your mind?"
              value={text}
              onChange={handleTextChange}
            />

            {/* File Upload */}
            <input
              type="file"
              className="w-full p-3 rounded-lg border border-gray-300 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              onChange={handleFileChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 focus:outline-none transition duration-300"
            >
              Submit Post
            </button>
          </form>
        </div>
      )}

      {/* Displaying submitted content */}
      {text && (
        <div className="mt-8 p-6 rounded-lg text-gray-800 w-3/4 sm:w-2/3 md:w-1/2 shadow-lg max-w-md">
          <h3 className="text-xl font-semibold mb-4">Your Post</h3>
          <div>
            <p>{text}</p>
          </div>
          {file && (
            <div className="mt-4">
              <h4 className="text-lg">Uploaded File:</h4>
              <img
                src={URL.createObjectURL(file)}
                alt="Submitted file preview"
                className="mt-4 max-w-full rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
