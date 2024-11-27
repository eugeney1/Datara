"use client"; // Ensures this component is client-side

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use next/navigation in Next 13+ for client-side routing
import Link from "next/link";
import "/app/globals.css";

export default function SignInPage() {
  const [userStatus, setUserStatus] = useState(null); // Track user status (null = not decided, 'guest' or 'signedIn')
  const router = useRouter(); // Initialize the useRouter hook

  const handleSignIn = () => {
    setUserStatus("signedIn");
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
    <main className="bg-[#121212] text-[#D1D1D1] min-h-screen flex flex-col font-sans">
      <div className="flex justify-center items-center min-h-screen bg-[#121212] text-[#D1D1D1]">
        {/* Show SignIn Success */}
        <h2 className="text-2xl text-[#00FFAB]">You have successfully signed in!</h2>
      </div>
    </main>
  );
}
