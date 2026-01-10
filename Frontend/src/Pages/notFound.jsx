import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const notFound = () => {
  return (
    <section>
        <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 text-center mt-13">
      <img
        src="/notFound.png"
        alt="404 Not Found"
        className="w-auto pr-10 sm:w-96 mb-6 shadow-lg rounded-full bg-white"
      />

      <h2 className="text-2xl font-semibold text-gray-700 mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-600 max-w-md mb-6">
        The page you are trying to access doesn’t exist or may have been moved.
        If this is a CampusSpeak feature, please check with the administration.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>

        <Link
          to="/dashboard"
          className="px-6 py-3 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Dashboard
        </Link>
      </div>

      <p className="mt-10 text-sm text-gray-400">
        CampusSpeak • AI-assisted grievance platform
      </p>
    </div>
    <Footer/>
    </section>
  );
};

export default notFound;
