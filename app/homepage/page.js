"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "/app/globals.css";


export default function HomePage() {
  const [sectionStates, setSectionStates] = useState({
    communities: true,
    recent: true,
    resources: true,
    createPost: false, // Track the state for creating a post
  });

  const [posts, setPosts] = useState({
    joinedPosts: {},
    postTimes: [],
    postDetails: [], // Store the post details such as title, content, image, etc.
  });

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    image: '',
  });

  useEffect(() => {
    // Initialize post creation times with random minutes (for simulation)
    const initialPostTimes = Array.from({ length: 6 }, () => Math.floor(Math.random() * 6)); // Random minutes between 0 and 5
    setPosts((prevPosts) => ({
      ...prevPosts,
      postTimes: initialPostTimes,
    }));

    // Update the post times every minute (60000 ms)
    const interval = setInterval(() => {
      setPosts((prevPosts) => ({
        ...prevPosts,
        postTimes: prevPosts.postTimes.map((time) => time + 1), // Increment each post time by 1 minute
      }));
    }, 60000); // Update every minute (1 minute = 60000ms)

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleCreatePost = () => {
    // Create a new post
    setPosts((prevPosts) => ({
      ...prevPosts,
      postDetails: [
        ...prevPosts.postDetails,
        { title: newPost.title, content: newPost.content, image: newPost.image },
      ],
      postTimes: [0, ...prevPosts.postTimes], // New post created now (0 minutes ago)
    }));

    // Reset the form
    setNewPost({
      title: '',
      content: '',
      image: '',
    });

    // Hide the form after submission
    setSectionStates((prevState) => ({ ...prevState, createPost: false }));
  };

  const toggleSection = (section) => {
    setSectionStates((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const toggleJoin = (postId) => {
    setPosts((prevPosts) => ({
      ...prevPosts,
      joinedPosts: {
        ...prevPosts.joinedPosts,
        [postId]: !prevPosts.joinedPosts[postId],
      },
    }));
  };

  // Function to format time in a human-readable "X minute(s) ago"
  const formatTime = (timeInMinutes) => {
    return `${timeInMinutes} minute${timeInMinutes === 1 ? "" : "s"} ago`;
  };

  return (
    <main className="bg-[#121212] text-[#D1D1D1] min-h-screen font-sans">
      {/* Fixed Top Bar */}
      <header className="flex items-center justify-between bg-[#0D0D0D] p-6 shadow-2xl border-b-2 border-[#00FFAB] fixed w-full top-0 z-10">
        <div className="flex items-center space-x-6">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <img
              className="object-scale-down h-14 w-14 rounded-lg cursor-pointer transform hover:scale-110 transition duration-300"
              src="/images/Screenshot%202024-11-26%20122532.png"
              alt="Datara Logo"
            />
          </a>
        </div>

        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search the future..."
            className="w-full px-6 py-3 bg-[#1B1B1B] text-white rounded-full focus:outline-none placeholder-gray-500 transition-all duration-300 transform hover:scale-105"
          />
        </div>

        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-[#00FFAB] transition duration-200">Chat</button>
          <button className="text-white hover:text-[#00FFAB] transition duration-200">Notifications</button>
          <Link href="/profile">
            <button className="text-white hover:text-[#00FFAB] transition duration-200">Profile</button>
          </Link>
          <Link href="/signin">
            <button className="text-white hover:text-[#00FFAB] transition duration-200">Sign In</button>
          </Link>
          <button
            onClick={() => setSectionStates((prevState) => ({ ...prevState, createPost: !prevState.createPost }))}
            className="bg-[#00FFAB] text-black px-6 py-2 rounded-full hover:bg-[#00CC8B] transition duration-300 transform hover:scale-110"
          >
            Create Post
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-grow pt-24">
        {/* Sidebar Navigation */}
        <aside className="w-1/5 bg-[#1A1A1A] p-8 flex flex-col space-y-8 shadow-lg border-r border-[#00FFAB] fixed top-24 left-0 h-[calc(100vh-6rem)] overflow-y-auto">
          <img
            src="/images/Screenshot%202024-11-26%20122532.png"
            alt="Datara Logo"
            className="h-32 w-32 object-scale-down rounded-full mx-auto border-4 border-[#00FFAB] transform hover:rotate-180 transition duration-500"
          />
          <nav className="space-y-6">
            {["homepage", "Popular", "Explore", "All"].map((tab) => (
              <Link
                key={tab}
                href={`/${tab}`}
                className="block px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 transform hover:bg-[#00FFAB] hover:text-black"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Link>
            ))}
          </nav>

          <div className="space-y-6">
            {/* RECENT Section */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => toggleSection("recent")}
              >
                <h3 className="text-lg font-bold group-hover:text-[#00FFAB]">RECENT</h3>
                <span className="text-[#00FFAB]">{sectionStates.recent ? "↑" : "↓"}</span>
              </div>
              {sectionStates.recent && (
                <ul className="space-y-2 mt-2">
                  <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
                    Recent Community 1
                  </li>
                  <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
                    Recent Community 2
                  </li>
                </ul>
              )}
            </div>

            <hr className="my-4 border-[#00FFAB]" />

            {/* COMMUNITIES Section */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => toggleSection("communities")}
              >
                <h3 className="text-lg font-bold group-hover:text-[#00FFAB]">COMMUNITIES</h3>
                <span className="text-[#00FFAB]">{sectionStates.communities ? "↑" : "↓"}</span>
              </div>
              {sectionStates.communities && (
                <ul className="space-y-2 mt-2">
                  <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
                    d/YourCommunity1
                  </li>
                  <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
                    d/YourCommunity2
                  </li>
                </ul>
              )}
            </div>

            <hr className="my-4 border-[#00FFAB]" />

            {/* RESOURCES Section */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => toggleSection("resources")}
              >
                <h3 className="text-lg font-bold group-hover:text-[#00FFAB]">RESOURCES</h3>
                <span className="text-[#00FFAB]">{sectionStates.resources ? "↑" : "↓"}</span>
              </div>
              {sectionStates.resources && (
                <ul className="space-y-2 mt-2">
                  <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
                    About Datara
                  </li>
                  <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
                    Content Policy
                  </li>
                  <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
                    Privacy Policy
                  </li>
                </ul>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 p-8 space-y-8 bg-[#1B1B1B] ml-[20%] overflow-y-auto">
          <h1 className="text-5xl font-bold mb-6 text-center text-[#00FFAB] transform hover:scale-110">
            Popular Posts
          </h1>

          {/* Create Post Form */}
          {sectionStates.createPost && (
            <div className="bg-[#333333] p-6 rounded-2xl shadow-2xl">
              <h2 className="text-xl font-bold text-[#00FFAB] mb-4">Create a Post</h2>
              <input
                type="text"
                name="title"
                value={newPost.title}
                onChange={handleInputChange}
                placeholder="Post Title"
                className="w-full p-3 mb-4 rounded-lg bg-[#1A1A1A] text-[#D1D1D1] border-none focus:outline-none"
              />
              <textarea
                name="content"
                value={newPost.content}
                onChange={handleInputChange}
                placeholder="Write your post content..."
                className="w-full p-3 mb-4 rounded-lg bg-[#1A1A1A] text-[#D1D1D1] border-none focus:outline-none"
                rows="5"
              />
              <input
                type="text"
                name="image"
                value={newPost.image}
                onChange={handleInputChange}
                placeholder="Image URL (optional)"
                className="w-full p-3 mb-4 rounded-lg bg-[#1A1A1A] text-[#D1D1D1] border-none focus:outline-none"
              />
              <button
                onClick={handleCreatePost}
                className="bg-[#00FFAB] text-black px-6 py-2 rounded-full hover:bg-[#00CC8B] transition duration-300 transform hover:scale-110"
              >
                Submit Post
              </button>
            </div>
          )}

          {/* Grid of Popular Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {posts.postDetails.map((post, index) => (
              <div
                key={index}
                className="bg-[#333333] p-6 rounded-2xl shadow-2xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <img
                  src={post.image || "/images/popular-post-placeholder.jpg"} // Default placeholder if no image is provided
                  alt={`Post ${index + 1}`}
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <p className="text-sm text-[#B3B3B3] mt-2">
                  <span className="text-[#00FFAB]">d/Community{index + 1}</span> • {formatTime(posts.postTimes[index])}
                </p>
                <h2 className="text-xl font-bold mt-4 text-[#00FFAB] transform hover:scale-105">
                  {post.title}
                </h2>
                <p className="text-[#D1D1D1] mt-2">
                  {post.content.substring(0, 100)}...
                </p>
                <div className="flex space-x-6 mt-4 items-center">
                  <button
                    className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                      posts.joinedPosts[index]
                        ? "bg-[#00FFAB] text-black"
                        : "bg-[#1A1A1A] text-[#D1D1D1] hover:bg-[#00FFAB] hover:text-black"
                    }`}
                    onClick={() => toggleJoin(index)}
                  >
                    {posts.joinedPosts[index] ? "✔ Joined" : "Join"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
