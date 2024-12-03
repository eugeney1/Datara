"use client";
import { useState } from "react";
import Link from "next/link";
import "/app/globals.css";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [posts, setPosts] = useState([]); // Array to hold the posts

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new post object
    const newPost = {
      title,
      description,
      id: Date.now(), // Unique ID based on timestamp
    };

    // Update the posts state with the new post
    setPosts([...posts, newPost]);

    // Optionally clear the form after submission
    setTitle("");
    setDescription("");

    console.log("Post Created:", newPost);
  };

  return (
    <div className="flex min-h-screen bg-[#181818] text-[#E0E0E0]">
      {/* Sidebar */}
      <div className="w-1/5 bg-[#202020] text-[#E0E0E0] p-6">
        <div className="flex flex-col space-y-6">
          <Link href="/" className="text-xl font-bold text-[#1E88E5]">Home</Link>
          <Link href="/" className="text-xl text-[#1E88E5]">Trending</Link>
          <Link href="/" className="text-xl text-[#1E88E5]">Subscriptions</Link>
          <Link href="/" className="text-xl text-[#1E88E5]">Library</Link>
          <Link href="/" className="text-xl text-[#1E88E5]">History</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#121212] p-6">
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-[#202020] p-4 shadow-md">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="/" target="_blank" rel="noopener noreferrer">
              <img
                className="object-scale-down h-10 w-10 rounded-lg cursor-pointer"
                src="/images/Screenshot%202024-11-26%20122532.png"
                alt="Datara Logo"
              />
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <input
              type="text"
              placeholder="Search Datara..."
              className="w-full px-4 py-2 bg-[#333333] text-white rounded-full focus:outline-none placeholder-gray-500"
            />
          </div>

          {/* Navigation Options */}
          <div className="flex items-center space-x-6">
            <button className="text-white">Notifications</button>
            <button className="text-white">Profile</button>
          </div>
        </header>

        {/* Create Post Form */}
        <main className="flex flex-grow flex-col p-8 space-y-8">
          <h1 className="text-4xl font-bold text-center text-[#1E88E5]">Create a New Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="flex flex-col">
              <label htmlFor="title" className="text-lg font-semibold text-[#1E88E5]">Title</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title"
                className="px-4 py-2 rounded-lg bg-[#333333] text-white focus:outline-none"
              />
            </div>

            {/* Description Input */}
            <div className="flex flex-col">
              <label htmlFor="description" className="text-lg font-semibold text-[#1E88E5]">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a short description for your post"
                className="px-4 py-2 rounded-lg bg-[#333333] text-white focus:outline-none"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#1E88E5] text-white px-6 py-2 rounded-full hover:bg-[#1976D2] transition duration-200"
              >
                Create Post
              </button>
            </div>
          </form>

          {/* Display Created Posts */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-[#1E88E5]">Your Posts</h2>
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="bg-[#333333] p-4 rounded-lg">
                  <h3 className="text-xl font-semibold text-[#1E88E5]">{post.title}</h3>
                  <p className="text-[#E0E0E0]">{post.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}
