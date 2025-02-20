import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home({setIsLoggedIn , isLoggedIn }) {

  // Check if the user is logged in by looking for a token in local storage
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // If token exists, set isLoggedIn to true
  }, [setIsLoggedIn]);

  return (
    <div className=" flex flex-col items-center ">
      <h1 className="text-4xl font-bold mb-8">Welcome to Your Dashboard</h1>
      <p className="text-lg mb-12 text-center max-w-2xl">
        Manage your daily routine and tasks effortlessly. {isLoggedIn ? "Enjoy your personalized dashboard." : "Sign up or log in to get started."}
      </p>
      <div className="flex space-x-4">
        {/* Routine Button */}
        <Link
          to="/routine"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold transition duration-300"
        >
          View Routine
        </Link>
        {/* To-Do Button */}
        <Link
          to="/todo"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold transition duration-300"
        >
          View To-Do
        </Link>
      </div>
      <div className="mt-12 space-x-4">
        {!isLoggedIn &&  (
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
        ) }
      </div>
    </div>
  );
}

export default Home;
