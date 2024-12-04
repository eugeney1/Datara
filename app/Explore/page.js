"use client";

import { useState } from "react";
import Link from "next/link";
import "/app/globals.css";

export default function ExplorePage() {
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(true);
  const [isRecentOpen, setIsRecentOpen] = useState(true);
  const [isResourcesOpen, setIsResourcesOpen] = useState(true);
  const [posts] = useState([
    { id: 1, title: "Gaming", body: "100K Members" },
    { id: 2, title: "Cars", body: "34K Members" },
    { id: 3, title: "Memes", body: "65M Members" },
    { id: 4, title: "Videos", body: "40M Members" },
    { id: 5, title: "Wholesomememes", body: "70M Members" },
    { id: 6, title: "LivestreamFail", body: "3.7M Members" },
    { id: 7, title: "Food", body: "30M Members" },
    { id: 8, title: "MadeMeSmile", body: "2M Members" },
    { id: 9, title: "Calgary", body: "300K Members" },
  ]);

  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const isSignedIn = true; // Hardcoded signed-in state

  const toggleSection = (section) => {
    if (section === "communities") setIsCommunitiesOpen(!isCommunitiesOpen);
    if (section === "recent") setIsRecentOpen(!isRecentOpen);
    if (section === "resources") setIsResourcesOpen(!isResourcesOpen);
  };

  // Join or leave community
  const handleJoinCommunity = (postId) => {
    if (joinedCommunities.includes(postId)) {
      // Leave community
      setJoinedCommunities(joinedCommunities.filter(id => id !== postId));
    } else {
      // Join community
      setJoinedCommunities([...joinedCommunities, postId]);
    }
  };

  // Join or leave all communities
  const handleJoinAllCommunities = () => {
    if (joinedCommunities.length === posts.length) {
      // Leave all communities
      setJoinedCommunities([]);
    } else {
      // Join all communities
      setJoinedCommunities(posts.map(post => post.id));
    }
  };

  return (
    <main className="bg-[#121212] text-[#D1D1D1] min-h-screen font-sans">
      {/* Include Font Awesome CDN */}
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>

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
          <button className="text-white hover:text-[#00FFAB] transition duration-200">
            <i className="fas fa-comments"></i> {/* Font Awesome Comment Icon */} Chat
          </button>
          <button className="text-white hover:text-[#00FFAB] transition duration-200">
            <i className="fas fa-bell"></i> {/* Font Awesome Bell Icon */} Notifications
          </button>

          {/* Conditionally show Profile or Sign In button */}
          {isSignedIn ? (
            <Link href="/profile">
              <button className="text-white hover:text-[#00FFAB] transition duration-200">
                <i className="fas fa-user"></i> {/* Font Awesome User Icon */} Profile
              </button>
            </Link>
          ) : (
            <Link href="/signin">
              <button className="text-white hover:text-[#00FFAB] transition duration-200">
                <i className="fas fa-sign-in-alt"></i> {/* Font Awesome Sign-In Icon */} Sign In
              </button>
            </Link>
          )}

          <Link href="/createpost">
            <button className="bg-[#00FFAB] text-black px-6 py-2 rounded-full hover:bg-[#00CC8B] transition duration-300 transform hover:scale-110">
              <i className="fas fa-plus"></i> {/* Font Awesome Plus Icon */} Create Post
            </button>
          </Link>
        </div>
      </header>

      <div className="flex flex-grow pt-24">
        {/* Sidebar */}
        <aside className="w-1/5 bg-[#1A1A1A] p-6 flex flex-col space-y-8 shadow-lg border-r border-[#00FFAB] fixed top-24 left-0 h-[calc(100vh-6rem)] overflow-y-auto">
          <img
            src="/images/Screenshot%202024-11-26%20122532.png"
            alt="Logo"
            className="h-28 w-28 rounded-full mx-auto border-4 border-[#00FFAB] transform hover:rotate-180 transition"
          />
          <nav className="space-y-6">
            {["homepage", "Popular", "Explore", "All"].map((tab) => (
              <Link
                key={tab}
                href={`/${tab}`}
                className="block px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#00FFAB] hover:text-black"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Link>
            ))}
          </nav>

          {/* Joined Communities */}
          <div>
            <h3 className="text-lg font-bold text-[#00FFAB]">Joined Communities</h3>
            <ul className="space-y-2 mt-2">
              {joinedCommunities.length === 0 ? (
                <li className="text-[#D1D1D1]">No joined communities</li>
              ) : (
                joinedCommunities.map((id) => {
                  const community = posts.find(post => post.id === id);
                  return (
                    <li key={id} className="p-2 bg-[#1A1A1A] rounded group hover:bg-[#00FFAB] cursor-pointer">
                      {community ? `${community.title}` : `Community ${id}`}
                    </li>
                  );
                })
              )}
            </ul>

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
                </ul>
              )}
            </div>
          </div>
        </aside>

        {/* Button to join or leave all communities */}
        <button
          onClick={handleJoinAllCommunities}
          className="mt-4 px-6 py-2 rounded-full bg-[#00FFAB] text-black hover:bg-[#00CC8B] transition duration-300"
        >
          {joinedCommunities.length === posts.length ? "Leave All Communities" : "Join All Communities"}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#1A1A1A] p-6 ml-[20%] pt-24 overflow-y-auto">
        <h2 className="text-xl font-bold text-[#00FFAB] mb-4">Explore Communities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="p-4 bg-[#2A2A2A] rounded-lg shadow-lg hover:scale-105">
              <h3 className="text-lg font-semibold text-[#00FFAB]">{post.title}</h3>
              <p className="text-sm text-[#D1D1D1]">{post.body}</p>
              <button
                onClick={() => handleJoinCommunity(post.id)}
                className={`mt-4 px-6 py-2 rounded-full ${joinedCommunities.includes(post.id) ? "bg-[#00FFAB] text-black" : "bg-[#1A1A1A] text-[#00FFAB] border-2 border-[#00FFAB]" } transition duration-300`}
              >
                {joinedCommunities.includes(post.id) ? "Joined" : "Join"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
