"use client";
import { useState } from "react";
import Link from "next/link";
import "/app/globals.css";
import CreateBox from "./createbox";

export default function Page() {
  const [activeTab, setActiveTab] = useState("home");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <main className="bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between bg-gradient-to-r from-[#F58529] to-[#DD2A7B] p-4 shadow-md">
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
            className="w-full px-4 py-2 bg-[#ffffff] text-[#333333] rounded-full focus:outline-none placeholder-gray-400"
          />
        </div>

        {/* Navigation Options */}
        <div className="flex items-center space-x-6">
          <button className="hover:text-[#DD2A7B] transition duration-200">Chat</button>
          <button className="hover:text-[#DD2A7B] transition duration-200">Notifications</button>
          {isSignedIn ? (
            <Link href="/profile">
              <button className="hover:text-[#DD2A7B] transition duration-200">Profile</button>
            </Link>
          ) : (
            <Link href="/signin">
              <button className="hover:text-[#DD2A7B] transition duration-200">
                Sign In
              </button>
            </Link>
          )}
          {/* Create Post button */}
          <Link href="/create">
            <button className="bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white px-6 py-2 rounded-full hover:bg-gradient-to-r hover:from-[#F58529] hover:to-[#F67E7E] transition duration-200">
              Create Post
            </button>
          </Link>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-grow">
        {/* Sidebar Navigation */}
        <aside className="w-1/5 bg-gradient-to-r from-[#F58529] to-[#DD2A7B] p-6 flex flex-col space-y-8 shadow-lg border-r border-[#DD2A7B]">
          <img
            src="/images/Screenshot%202024-11-26%20122532.png"
            alt="Datara Logo"
            className="h-16 w-16 object-scale-down rounded-full mx-auto border-4 border-gradient-to-r from-[#F58529] to-[#DD2A7B]"
          />
          <nav className="space-y-4">
            <Link
              href="/"
              className={`block px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 ${
                activeTab === "home"
                  ? "bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white"
                  : "hover:bg-[#ffffff] hover:text-[#F58529]"
              }`}
              onClick={() => handleTabClick("home")}
            >
              Home
            </Link>
            <Link
              href="/Popular"
              className={`block px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 ${
                activeTab === "popular"
                  ? "bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white"
                  : "hover:bg-[#ffffff] hover:text-[#F58529]"
              }`}
              onClick={() => handleTabClick("popular")}
            >
              Popular
            </Link>
            <Link
              href="/explore"
              className={`block px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 ${
                activeTab === "explore"
                  ? "bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white"
                  : "hover:bg-[#ffffff] hover:text-[#F58529]"
              }`}
              onClick={() => handleTabClick("explore")}
            >
              Explore
            </Link>
            <Link
              href="/all"
              className={`block px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-[#F58529] to-[#DD2A7B] text-white"
                  : "hover:bg-[#ffffff] hover:text-[#F58529]"
              }`}
              onClick={() => handleTabClick("all")}
            >
              All
            </Link>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 p-8 space-y-8 bg-[#ffffff]">
          <h1 className="text-5xl font-bold mb-6 text-center text-gradient-to-r from-[#F58529] to-[#DD2A7B]">
            Welcome to Datara
          </h1>

          {/* Placeholder for posts */}
          <div className="space-y-8">
            {[1, 2, 3].map((post) => (
              <div
                key={post}
                className="bg-[#ffffff] p-6 rounded-lg shadow-xl hover:shadow-2xl transition duration-300"
              >
                <h2 className="text-2xl font-semibold text-[#F58529]">
                  Post Title {post}
                </h2>
                <p className="text-[#333333]">Post content goes here...</p>
                <div className="flex space-x-6 mt-4">
                  <button className="text-[#F58529] hover:underline">Like</button>
                  <button className="text-[#F58529] hover:underline">Comment</button>
                  <button className="text-[#F58529] hover:underline">Share</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-1/4 bg-gradient-to-r from-[#F5C6CB] to-[#F9D5DC] p-6 space-y-8">
          <div className="border-b border-[#F58529] pb-6">
            <h2 className="text-2xl font-bold text-[#F58529]">Community Info</h2>
            <p className="text-[#333333]">
              Information about the selected community goes here...
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#F58529]">Stats</h2>
            <ul className="mt-4 space-y-4 text-[#333333]">
              <li>Members: 10,000</li>
              <li>Online: 200</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-[#F58529]">Quick Links</h2>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/help" className="text-[#F58529] hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#F58529] hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/signin" className="text-[#F58529] hover:underline">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
