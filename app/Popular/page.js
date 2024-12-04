"use client";

import { useState } from "react";
import Link from "next/link";
import "/app/globals.css";

export default function PopularPage() {
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(true);
  const [isRecentOpen, setIsRecentOpen] = useState(true);
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);

  // State for tracking joined posts
  const [joinedPosts, setJoinedPosts] = useState({});

  const toggleSection = (section) => {
    if (section === "communities") {
      setIsCommunitiesOpen(!isCommunitiesOpen);
    } else if (section === "recent") {
      setIsRecentOpen(!isRecentOpen);
    } else if (section === "resources") {
      setIsResourcesOpen(!isResourcesOpen);
    }
  };

  const toggleJoin = (postId) => {
    setJoinedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId], // Toggles the join state for the specific post
    }));
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
          <Link href="/createpost">
            <button className="bg-[#00FFAB] text-black px-6 py-2 rounded-full hover:bg-[#00CC8B] transition duration-300 transform hover:scale-110">
              Create Post
            </button>
          </Link>
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
                <span className="text-[#00FFAB]">{isRecentOpen ? "↑" : "↓"}</span>
              </div>
              {isRecentOpen && (
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

            {/* Divider */}
            <hr className="my-4 border-[#00FFAB]" />

            {/* COMMUNITIES Section */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => toggleSection("communities")}
              >
                <h3 className="text-lg font-bold group-hover:text-[#00FFAB]">COMMUNITIES</h3>
                <span className="text-[#00FFAB]">{isCommunitiesOpen ? "↑" : "↓"}</span>
              </div>
              {isCommunitiesOpen && (
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

            {/* Divider */}
            <hr className="my-4 border-[#00FFAB]" />

            {/* RESOURCES Section */}
            <div>
              <div
                className="flex justify-between items-center cursor-pointer group"
                onClick={() => toggleSection("resources")}
              >
                <h3 className="text-lg font-bold group-hover:text-[#00FFAB]">RESOURCES</h3>
                <span className="text-[#00FFAB]">{isResourcesOpen ? "↑" : "↓"}</span>
              </div>
              {isResourcesOpen && (
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
                  <li className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] hover:text-black transition-all duration-300 cursor-pointer">
                    User Agreement
                  </li>
                </ul>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 p-8 space-y-8 bg-[#1B1B1B] ml-[20%] overflow-y-auto">
          <h1 className="text-5xl font-bold mb-6 text-center text-[#00FFAB]">
            Popular Posts
          </h1>

          {/* List of Popular Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Post 1", "Post 2", "Post 3", "Post 4"].map((post) => (
              <div
                key={post}
                className="bg-[#333333] p-6 rounded-2xl shadow-2xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <h2 className="text-xl font-bold text-[#00FFAB]">{post}</h2>
                <p className="text-[#D1D1D1] mt-2">
                  A snippet or preview of {post} content.
                </p>
                <div className="flex space-x-6 mt-4 items-center">
                  <button
                    className={`px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                      joinedPosts[post]
                        ? "bg-[#00FFAB] text-black"
                        : "bg-[#1A1A1A] text-[#D1D1D1] hover:bg-[#00FFAB] hover:text-black"
                    }`}
                    onClick={() => toggleJoin(post)}
                  >
                    {joinedPosts[post] ? "✔ Joined" : "Join"}
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
