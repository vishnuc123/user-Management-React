import React from "react";

const ShowDetails = ({ name = "User" }) => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-center">
      
      {/* Welcome Message */}
      <h1 className="text-5xl font-bold animate-bounce">
        👋 Welcome, {name}!
      </h1>

      {/* Subtext */}
      <p className="mt-4 text-lg animate-pulse">
        Glad to see you again. Let’s make today awesome 🚀
      </p>

      {/* Call to Action */}
      <button className="mt-8 px-6 py-3 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:scale-105 transform transition duration-300">
        Get Started
      </button>
    </div>
  );
};

export default ShowDetails;
