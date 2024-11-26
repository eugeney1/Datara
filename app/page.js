"use client";
import { useState } from "react";
import Link from "next/link";
import '/app/globals.css';
import CreateBox from "./createbox";

export default function Page() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("about");

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <main className="bg-[#121212] text-white h-screen flex flex-col p-6">
      {/* Logo/Screenshot at the top-left corner */}
      <div className="absolute top-4 left-4">
        <a href="http://localhost:3001/" target="_blank" rel="noopener noreferrer">
          <img
            className="object-scale-down h-20 w-20 rounded-lg shadow-lg cursor-pointer"
            src="/images/Screenshot%202024-11-26%20122532.png"
            alt="Datara Screenshot"
          />
        </a>
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-center my-10">Welcome to Datara</h1>

      {/* Create Box Component */}
      <div className="flex justify-center">
        <CreateBox />
      </div>

      {/* Navigation Links */}
      <ul className="absolute bottom-10 left-4 text-lg space-y-4">
        <li>
          <Link href="/aboutdatara" className="font-semibold text-[#1E90FF] hover:text-[#187bcd] transition-colors duration-300">
            Go to About Datara Page
          </Link>
        </li>
        <li>
          <Link href="/Popular" className="font-semibold text-[#1E90FF] hover:text-[#187bcd] transition-colors duration-300">
            Go to Popular Page
          </Link>
        </li>
      </ul>
    </main>
  );
}
