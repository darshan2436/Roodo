import React, { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { useNavigate , Link } from "react-router-dom";

const App = ({isLoggedIn , setIsLoggedIn}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const storedEmail = localStorage.getItem("email");
      
      if (!storedEmail) {
        setError("No email found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://roodobackend-production.up.railway.app/api/auth/profile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: storedEmail }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message || "Could not load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove the token from local storage
    localStorage.removeItem("email"); // Remove the email from local storage
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home page
  };

  return (
    <main className="w-full bg-gray-50 flex items-center justify-center p-4">
      {isLoggedIn ? <div className="bg-white rounded-lg shadow-sm max-w-md w-full p-6 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
          <div className="text-center">
            {loading ? (
              <div className="space-y-2">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto"></div>
              </div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : profile ? (
              <>
                <h1 className="text-xl font-semibold text-gray-900">
                  {profile.username}
                </h1>
                <p className="text-gray-500">{profile.email}</p>
              </>
            ) : null}
          </div>
        </div>
        <div className="border-t border-gray-100 pt-6">
          <button
            className="w-full flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 px-4 rounded-md transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            <span>Log out</span>
          </button>
        </div>
      </div> :(
          <>
            {/* Log In Button */}
            <Link
              to="/login"
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
              Log In
            </Link>
            {/* Sign Up Button */}
            <Link
              to="/signup"
              className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg shadow-md transition duration-300"
            >
              Sign Up
            </Link>
          </>
        )}
    </main>
  );
};

export default App;