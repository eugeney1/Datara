"use client"

import { useUserAuth } from "./_utils/auth-context"
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
        <main className="m-5">
            <header>
                <h1 className="text-3xl text-center text-white"></h1>
            </header>

            {user ? (
                <div>
                    <p>Welcome, {user.displayName || user.email}!</p>
                    {user.photoURL && <img src={user.photoURL} alt="User Profile" />}
                    <Link href="http://localhost:3000/">
                        <a className="text-blue-500">homepage</a> {}
                    </Link>
                    <button type="button" className="text-white" onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <div>
                    <button type="button" className="text-white" onClick={handleSignIn}>Sign In with GitHub</button>
                </div>
            )}
        </main>
    );
}
