import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  auth,
  googleProvider,
  githubProvider,
  twitterProvider,
  microsoftProvider,
} from "./firebase.config";
import { User } from "./types/user";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (provider: any, providerName: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await signInWithPopup(auth, provider);
      const loggedUser: User = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        providerId: providerName,
      };
      setUser(loggedUser);
      console.log("Logged in user:", loggedUser);
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log("User signed out");
    } catch (error: any) {
      console.error("Sign out error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Firebase Auth Demo
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!user ? (
          <div className="space-y-4">
            <button
              onClick={() => handleSignIn(googleProvider, "google")}
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>

            <button
              onClick={() => handleSignIn(microsoftProvider, "microsoft")}
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in with Microsoft"}
            </button>

            <button
              onClick={() => handleSignIn(githubProvider, "github")}
              disabled={loading}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in with GitHub"}
            </button>

            <button
              onClick={() => handleSignIn(twitterProvider, "twitter")}
              disabled={loading}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in with Twitter"}
            </button>
          </div>
        ) : (
          <div className="text-center">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
            )}

            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Welcome, {user.displayName}!
            </h2>

            {user.email && <p className="text-gray-600 mb-4">{user.email}</p>}

            <p className="text-sm text-gray-500 mb-6">
              Signed in with {user.providerId}
            </p>

            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
