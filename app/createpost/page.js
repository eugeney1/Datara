"use client";

import { useState } from "react";
import Link from "next/link";
import "/app/globals.css";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [media, setMedia] = useState(null);

  // States for toggling sections (initially open as in HomePage)
  const [isRecentOpen, setIsRecentOpen] = useState(true);
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(true);
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title,
      description,
      community: selectedCommunity,
      media,
      id: Date.now(),
    };

    console.log("New Post Created:", newPost);

    setTitle("");
    setDescription("");
    setSelectedCommunity("");
    setMedia(null);
  };

  const toggleSection = (section) => {
    if (section === "recent") {
      setIsRecentOpen(!isRecentOpen);
    } else if (section === "communities") {
      setIsCommunitiesOpen(!isCommunitiesOpen);
    } else if (section === "resources") {
      setIsResourcesOpen(!isResourcesOpen);
    }
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
        <aside className="w-[300px] bg-[#1A1A1A] p-8 flex flex-col space-y-8 shadow-lg border-r border-[#00FFAB] fixed top-24 left-0 h-[calc(100vh-6rem)] overflow-y-auto">
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
        <div className="flex-1 p-8 space-y-8 bg-[#1B1B1B] ml-[300px] overflow-auto">
          {/* Create Post Form */}
          <h1 className="text-2xl font-bold text-[#00FFAB]">Create a New Post</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-lg font-medium">Post Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-lg font-medium">Post Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="community" className="block text-lg font-medium">Select Community</label>
              <select
                id="community"
                value={selectedCommunity}
                onChange={(e) => setSelectedCommunity(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded focus:outline-none"
              >
                <option value="">Select a community</option>
                <option value="community1">Community 1</option>
                <option value="community2">Community 2</option>
              </select>
            </div>
            <div>
              <label htmlFor="media" className="block text-lg font-medium">Attach Media (Optional)</label>
              <input
                type="file"
                id="media"
                onChange={(e) => setMedia(e.target.files[0])}
                className="w-full px-4 py-3 bg-[#2D2D2D] text-white rounded focus:outline-none"
              />
            </div>
            <button type="submit" className="bg-[#00FFAB] text-black px-6 py-2 rounded-full w-full mt-4">Submit Post</button>
          </form>
        </div>
      </div>
    </main>
  );
}
