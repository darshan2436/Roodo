import { useState ,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("authToken"); // or any other method you use to store user info

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect if already logged in
    }
  }, [isLoggedIn, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch('https://roodobackend-production.up.railway.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = '/login'; 
      } else {
        // Handle errors, display error message
        setError(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 max-h-screen bg-gradient-to-r  from-blue-500 to-green-500">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Create Account</h1>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* Error message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-700 mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
