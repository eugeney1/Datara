"use client";
import { useState } from "react";
import Link from "next/link";
import "/app/globals.css";

export default function HomePage() {
  const [userStatus, setUserStatus] = useState("guest"); // Track user status (null = not decided, 'guest' or 'signedIn')

  return (
    <main className="bg-[#121212] text-[#D1D1D1] min-h-screen flex flex-col font-sans">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-[#0D0D0D] p-6 shadow-2xl border-b-2 border-[#00FFAB]">
        {/* Logo */}
        <div className="flex items-center space-x-6">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <img
              className="object-scale-down h-14 w-14 rounded-lg cursor-pointer transform hover:scale-110 transition duration-300"
              src="/images/Screenshot%202024-11-26%20122532.png"
              alt="Datara Logo"
            />
          </a>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6">
          <input
            type="text"
            placeholder="Search the future..."
            className="w-full px-6 py-3 bg-[#1B1B1B] text-white rounded-full focus:outline-none placeholder-gray-500 transition-all duration-300 transform hover:scale-105"
          />
        </div>

        {/* Navigation Options */}
        <div className="flex items-center space-x-6">
          <button className="text-white hover:text-[#00FFAB] transition duration-200">Chat</button>
          <button className="text-white hover:text-[#00FFAB] transition duration-200">Notifications</button>
          {userStatus === "signedIn" ? (
            <Link href="/profile">
              <button className="text-white hover:text-[#00FFAB] transition duration-200">Profile</button>
            </Link>
          ) : (
            <Link href="/signin">
              <button className="text-white hover:text-[#00FFAB] transition duration-200">Sign In</button>
            </Link>
          )}
          {/* Create Post button */}
          <Link href="/createpost">
            <button className="bg-[#00FFAB] text-black px-6 py-2 rounded-full hover:bg-[#00CC8B] transition duration-300 transform hover:scale-110">
              Create Post
            </button>
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-grow">
        {/* Sidebar Navigation */}
        <aside className="w-1/5 bg-[#1A1A1A] p-8 flex flex-col space-y-8 shadow-lg border-r border-[#00FFAB]">
          <img
            src="/images/Screenshot%202024-11-26%20122532.png"
            alt="Datara Logo"
            className="h-20 w-20 object-scale-down rounded-full mx-auto border-4 border-[#00FFAB] transform hover:rotate-180 transition duration-500"
          />
          <nav className="space-y-6">
            {["home", "popular", "explore", "all"].map((tab) => (
              <Link
                key={tab}
                href={`/${tab}`}
                className={`block px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 transform`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 p-8 space-y-8 bg-[#1B1B1B]">
          <h1 className="text-5xl font-bold mb-6 text-center text-[#00FFAB] transform hover:scale-110">
            Popular Posts
          </h1>

          {/* Grid of Popular Posts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((post) => (
              <div
                key={post}
                className="bg-[#333333] p-6 rounded-2xl shadow-2xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <img
                  src={`/images/popular-post-${post}.jpg`} // Add relevant images for popular posts
                  alt={`Popular Post ${post}`}
                  className="w-full h-48 object-cover rounded-2xl mb-4 transition-all duration-500 transform hover:scale-110"
                />
                <h2 className="text-2xl font-semibold text-[#00FFAB] transform hover:scale-105">
                  Post Title {post}
                </h2>
                <p className="text-[#D1D1D1] mt-2">
                  A short description or preview of the post content goes here.
                </p>
                <div className="flex space-x-6 mt-4">
                  <button className="text-[#00FFAB] hover:underline transform hover:scale-105">Like</button>
                  <button className="text-[#00FFAB] hover:underline transform hover:scale-105">Comment</button>
                  <button className="text-[#00FFAB] hover:underline transform hover:scale-105">Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-1/4 bg-[#1A1A1A] p-8 space-y-8">
          <div className="border-b border-[#333333] pb-6">
            <h2 className="text-2xl font-bold text-[#00FFAB]">Trending Topics</h2>
            <ul className="mt-4 space-y-4">
              <li><Link href="/topic/1" className="text-[#00FFAB] hover:underline transform hover:scale-105">Topic 1</Link></li>
              <li><Link href="/topic/2" className="text-[#00FFAB] hover:underline transform hover:scale-105">Topic 2</Link></li>
              <li><Link href="/topic/3" className="text-[#00FFAB] hover:underline transform hover:scale-105">Topic 3</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#00FFAB]">Quick Links</h2>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/help" className="text-[#00FFAB] hover:underline transform hover:scale-105">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#00FFAB] hover:underline transform hover:scale-105">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
