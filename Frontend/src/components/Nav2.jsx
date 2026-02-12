import React from 'react'
import { Link } from 'react-router-dom'
const Nav2 = () => {

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-blue-600 text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">

        <div className="flex items-center gap-4">
          <div className="text-3xl bg-black rounded-full p-2">
            <i className="ri-graduation-cap-line"></i>
          </div>
          <h1 className="text-2xl font-semibold">CampusSpeak-AI</h1>
        </div>

        <div className="flex gap-6 text-2xl">
          <button onClick={() => scrollTo("home")} aria-label="Home"
            className="hover:text-orange-400 transition">
            <Link to='/'><i className="ri-home-8-line"></i></Link>
          </button>

          <button aria-label="Login"
            className="hover:text-orange-400 transition">
            <Link to='/user/login'><i className="ri-login-box-line"></i></Link>
          </button>


        </div>

      </div>
    </nav>
  )
}

export default Nav2
