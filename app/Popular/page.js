"use client";
import { useState } from "react";
import Link from "next/link";
import "/app/globals.css";

export default function Page() {
  // State for likes and comments
  const [likes, setLikes] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [comments, setComments] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  // Handle like and comment button click
  const handleLike = (postId) => {
    setLikes((prev) => ({
      ...prev,
      [postId]: prev[postId] + 1,
    }));
  };

  const handleComment = (postId) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId] + 1,
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#181818]">
      {/* Sidebar */}
      <div className="w-1/5 bg-[#202020] text-white p-4">
        <div className="flex flex-col space-y-6">
          <Link href="/" className="text-xl font-bold">Home</Link>
          <Link href="/" className="text-xl">Trending</Link>
          <Link href="/" className="text-xl">Subscriptions</Link>
          <Link href="/" className="text-xl">Library</Link>
          <Link href="/" className="text-xl">History</Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#121212] p-6">
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-[#181818] p-4 shadow-md">
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
            {/* Create Post button */}
            <Link href="/create">
              <button className="bg-[#1E88E5] text-white px-6 py-2 rounded-full hover:bg-[#1976D2] transition duration-200">
                Create Post
              </button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-grow flex-col p-4 space-y-8">
          <h1 className="text-4xl font-bold text-center text-white">Popular Posts</h1>

          {/* Grid of Popular Posts */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((post) => (
              <div
                key={post}
                className="bg-[#2C2C2C] p-4 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
              >
                <img
                  src={`/images/post-image-${post}.jpg`} // Use appropriate image filenames for each post
                  alt={`Post ${post}`}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-semibold text-white">Post Title {post}</h2>
                <p className="text-gray-400 mt-4">A short description of the post goes here. It's a popular topic that's trending right now.</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    className="bg-[#1E88E5] text-white px-4 py-2 rounded-full hover:bg-[#1976D2] transition duration-200 transform hover:scale-105"
                    onClick={() => handleLike(post)}
                  >
                    Like {likes[post] > 0 && `(${likes[post]})`}
                  </button>
                  <button
                    className="bg-[#1E88E5] text-white px-4 py-2 rounded-full hover:bg-[#1976D2] transition duration-200 transform hover:scale-105"
                    onClick={() => handleComment(post)}
                  >
                    Comment {comments[post] > 0 && `(${comments[post]})`}
                  </button>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
