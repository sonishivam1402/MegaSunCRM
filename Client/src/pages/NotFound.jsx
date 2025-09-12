import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center  p-8 max-w-md w-full">
        <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">Page Not Found</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700 transition shadow-md"
        >
          Go Back
        </button>
      </div>
    </main>
  );
}