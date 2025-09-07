import { useState, useContext } from "react";
import { login } from "../api/authApi.js";
import FrameBg from "/FrameBg.png";
import Frame from "/Frame.png";
import dashboard from "/dashboard.png";
import Logo from "/Logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password }); // call AuthContext login
      setError("");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center ">
        <div className="w-[500px] h-[500px] flex flex-col gap-10 p-6">
          <img src={Logo} alt="Logo" className="w-[260px] h-[122px]" />

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
            <div>
              <label htmlFor="email">Username</label>
              <input
                type="email"
                placeholder="Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 focus:outline-none bg-gray-300"
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 focus:outline-none bg-gray-300"
                required
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900 text-white p-3 font-medium transition cursor-pointer"
            >
              Login
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
