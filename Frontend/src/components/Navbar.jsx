import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-blue-600 text-white shadow-md h-20 ">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 h-16">
        <div className="flex items-center gap-3 mt-3">
          <div className="text-2xl bg-black rounded-full p-2">
            <i className="ri-graduation-cap-line"></i>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            CampusSpeak-AI
          </h1>
        </div>

        <div className="hidden md:flex gap-6 mt-4 text-2xl">
          <Link to="/" onClick={() => scrollTo("home")} className="hover:text-orange-400">
            <i className="ri-home-8-line"></i>
          </Link>

          <Link to="/" onClick={() => scrollTo("about")} className="hover:text-orange-400">
            <i className="ri-information-line"></i>
          </Link>

          <Link to="/" onClick={() => scrollTo("contact")} className="hover:text-orange-400">
            <i className="ri-customer-service-2-fill"></i>
          </Link>

          <Link to="/user/login" className="hover:text-orange-400">
            <i className="ri-login-box-line"></i>
          </Link>

          <Link to="/admin/login" className="hover:text-orange-400">
            <i className="ri-dashboard-line"></i>
          </Link>

          <Link to="/user/profile" className="hover:text-orange-400">
            <i className="ri-user-3-line"></i>
          </Link>

          
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl focus:outline-none"
        >
          <i className={open ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-blue-700 text-white px-6 py-4 space-y-4 text-lg">
          <Link to="/"
            onClick={() => scrollTo("home")} className="block w-full text-left cursor-pointer">
            🏠 Home
          </Link>

          <Link to="/"
            onClick={() => scrollTo("about")} className="block w-full text-left cursor-pointer">
            ℹ️ About
          </Link>

          <Link to="/"
            onClick={() => scrollTo("contact")} className="block w-full text-left cursor-pointer">
            📞 Contact
          </Link >

          <Link to="/user/login" onClick={() => setOpen(false)} className="block">
            🔐 User Login
          </Link>

          <Link to="/user/profile" onClick={() => setOpen(false)} className="block">
            <i className="ri-user-3-fill text-xl"></i> Your Profile
          </Link>

          <Link to="/admin/login" onClick={() => setOpen(false)} className="block">
            📊 Admin Dashboard
          </Link>


        </div>
      )}
    </nav>
  );
};

export default Navbar;
