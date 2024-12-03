"use client"; // Ensures this component is client-side

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation in Next 13+ for client-side routing
import Link from "next/link";
import "/app/globals.css";
<<<<<<< HEAD
import CreateBox from "./createbox";

export default function Page() {
  const [activeTab, setActiveTab] = useState("about");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
=======

export default function SignInPage() {
  const [userStatus, setUserStatus] = useState(null); // Track user status (null = not decided, 'guest' or 'signedIn')
  const router = useRouter(); // Initialize the useRouter hook

  const handleSignIn = () => {
    setUserStatus("signedIn");
>>>>>>> 6ee04e5a327bd25eb2862db7a6c89e97c63efbed
  };

  // Redirect to the homepage when clicking Continue as Guest
  const handleGuest = () => {
    setUserStatus("guest");
    router.push("/"); // Navigate to the homepage
  };

  if (userStatus === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#121212] text-[#D1D1D1]">
        {/* Sign In or Continue as Guest */}
        <div className="bg-[#181818] p-8 rounded-xl shadow-lg text-center space-y-6">
          <h1 className="text-3xl font-semibold text-[#00FFAB]">Welcome to Datara</h1>
          <p className="text-lg text-[#D1D1D1]">Please sign in to access your account, or continue as a guest.</p>

          <div className="flex justify-center space-x-6">
            {/* Sign In Button Link to /signin Page */}
            <Link href="/signin">
              <button
                className="bg-[#00FFAB] text-black px-6 py-2 rounded-full hover:bg-[#00CC8B] transition duration-300"
              >
                Sign In
              </button>
            </Link>
            <button
              onClick={handleGuest} // Calls the handleGuest function for redirection
              className="bg-[#333333] text-white px-6 py-2 rounded-full hover:bg-[#555555] transition duration-300"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <main className="bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#1e2229] text-white min-h-screen flex flex-col items-center p-6 relative">
      {/* Logo Section */}
      <div className="absolute top-6 left-6">
        <a href="http://localhost:3001/" target="_blank" rel="noopener noreferrer">
          <img
            className="object-scale-down h-20 w-20 rounded-lg shadow-lg shadow-[#1E90FF] hover:scale-105 transition-transform duration-300 cursor-pointer"
            src="/images/Screenshot%202024-11-26%20122532.png"
            alt="Datara Logo"
          />
        </a>
      </div>

      {/* Welcome Header */}
      <h1 className="text-4xl md:text-6xl font-bold text-center my-12 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#1E90FF] via-[#00D4FF] to-[#187bcd]">
        Welcome to Datara
      </h1>

      {/* Create Box Component */}
      <div className="w-full max-w-3xl px-4">
        <CreateBox />
      </div>

      {/* Navigation Links */}
      <ul className="absolute bottom-8 left-6 text-base md:text-lg space-y-4">
        <li>
          <Link
            href="/aboutdatara"
            className="font-semibold text-[#1E90FF] hover:text-[#00D4FF] transition duration-300 hover:underline hover:underline-offset-4"
          >
            About Datara
          </Link>
        </li>
        <li>
          <Link
            href="/Popular"
            className="font-semibold text-[#1E90FF] hover:text-[#00D4FF] transition duration-300 hover:underline hover:underline-offset-4"
          >
            Popular
          </Link>
        </li>
      </ul>

      {/* Bottom Tab Navigation */}
      <div className="absolute bottom-8 right-6 flex flex-col space-y-3">
        {["about", "popular"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-6 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
              activeTab === tab
                ? "bg-[#1E90FF] text-white shadow-md shadow-[#1E90FF]"
                : "bg-[#2a2a2a] text-gray-300 hover:bg-[#1E90FF] hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
=======
    <main className="bg-[#121212] text-[#D1D1D1] min-h-screen flex flex-col font-sans">
      <div className="flex justify-center items-center min-h-screen bg-[#121212] text-[#D1D1D1]">
        {/* Show SignIn Success */}
        <h2 className="text-2xl text-[#00FFAB]">You have successfully signed in!</h2>
      </div>
>>>>>>> 6ee04e5a327bd25eb2862db7a6c89e97c63efbed
    </main>
  );
}
