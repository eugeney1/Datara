"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from 'next/link'; 
import '/app/globals.css';

export default function SignInPage() {
    const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

    async function handleSignIn() {
        try {
            await gitHubSignIn();
        } catch (error) {
            console.log(error);
        }
    }

    async function handleSignOut() {
        try {
            await firebaseSignOut();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="bg-[#121212] min-h-screen flex items-center justify-center text-[#D1D1D1] font-sans">
            <div className="bg-[#1A1A1A] p-8 rounded-lg shadow-xl w-full sm:w-2/3 md:w-1/3 max-w-md">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-semibold text-[#00FFAB]">Sign In</h1>
                    <p className="text-lg text-[#D1D1D1] mt-2">Please sign in to continue</p>
                </header>

                {user ? (
                    <div className="text-center">
                        <p className="text-lg">Welcome, {user.displayName || user.email}!</p>
                        {user.photoURL && <img src={user.photoURL} alt="User Profile" className="w-24 h-24 rounded-full mx-auto mt-4" />}
                        <div className="mt-4">
                            <Link href="http://localhost:3000/homepage" className="text-[#00FFAB] hover:underline">
                                Go to Homepage
                            </Link>
                        </div>
                        <button
                            type="button"
                            className="mt-4 w-full bg-[#00FFAB] text-black p-3 rounded-lg hover:bg-[#00CC8B] transition duration-300"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <button
                            type="button"
                            className="w-full bg-[#00FFAB] text-black p-3 rounded-lg hover:bg-[#00CC8B] transition duration-300"
                            onClick={handleSignIn}
                        >
                            Sign In with GitHub
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
