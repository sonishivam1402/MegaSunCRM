import { useState, useContext, useEffect } from "react";
import Frame from "/Frame.png";
import Logo from "/Logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, token } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login({ email, password });
    } catch (err) {
      console.error("Login error:", err);

      // Handle different types of errors
      if (err.response) {

        const message = err.response.data?.message || err.response.data?.error;
        setError(message || "Login failed. Please try again");

      } else if (err.request) {
        // Network error
        setError("Network error. Please check your connection and try again");
      } else {
        // Other error
        setError("An unexpected error occurred. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/30 bg-opacity-75 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            {/* Spinning Loader */}
            <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-green-900 text-lg font-medium">Signing you in...</p>
          </div>
        </div>
      )}

      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-[500px] h-[500px] flex flex-col gap-10 p-6">
          <img src={Logo} alt="Logo" className="w-[260px] h-[122px]" />

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 focus:outline-none bg-gray-300 rounded border focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 focus:outline-none bg-gray-300 rounded border focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all"
                required
                disabled={isLoading}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-800 hover:bg-green-900 disabled:bg-green-600 disabled:cursor-not-allowed text-white p-3 font-medium transition-all rounded flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 h-screen relative">
        <img
          src={Frame}
          alt="Illustration"
          className="w-full h-full object-cover"
        />
        {/* <img
          src={dashboard}
          alt="Illustration"
          className="w-230 h-100 object-fill z-40 absolute bottom-0 left-6"
        />
        <span className="anton-regular text-4xl font-extrabold absolute top-50 left-25 text-white">Your one-stop hub for sales,</span>
        <span className="anton-regular text-4xl font-bold absolute top-60 left-40 text-white">leads, and smashing targets!</span> */}
      </div>
    </div>
  );
}