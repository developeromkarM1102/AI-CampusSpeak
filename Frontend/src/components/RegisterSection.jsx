import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const RegisterSection = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const fullName = e.target.fullName.value
    const lastName = e.target.lastName.value
    const email = e.target.email.value
    const password = e.target.password.value

    try {
      const response = await axios.post(
        "https://ai-campusspeak.onrender.com/api/auth/user/register",
        { fullName, lastName, email, password },
        {withCredentials:true}
      )

      console.log(response.data)
      navigate("/user/login");
    } 
    catch (error) { 
      console.error(error)
    }

  };

  return (
    <div className="bg-[url('/Login2.webp')] bg-cover bg-center w-full min-h-screen flex items-center justify-center px-4 py-8 md:py-20">
      <div className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-20 w-full max-w-7xl mt-7'>
        <div className='flex flex-col justify-center w-full max-w-md'>
          <h2 className='text-center text-white font-bold text-2xl md:text-3xl mb-5'>
            Register Here !
          </h2>

          <form
            onSubmit={handleSubmit}
            className='flex flex-col items-center rounded-2xl p-6 md:p-8 bg-cyan-100 w-full'
          >
            <div className='text-center bg-blue-400 px-8 py-4 rounded-2xl w-full mb-5'>
              <h2 className='text-xl md:text-2xl font-bold mb-2'>Most Welcome!</h2>
              <p className='text-white text-sm md:text-base'>Create your account & enjoy!</p>
            </div>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your FirstName"
              className="p-3 mb-4 w-full border-2 rounded-md text-black focus:outline-none focus:border-blue-500"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Enter your LastName"
              className="p-3 mb-4 w-full border-2 rounded-md text-black focus:outline-none focus:border-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="p-3 mb-4 w-full border-2 rounded-md text-black focus:outline-none focus:border-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              className="p-3 mb-5 w-full border-2 rounded-md text-black focus:outline-none focus:border-blue-500"
            />

            <p className='text-black text-sm md:text-base text-center mb-6'>
              Already Have Account?
              <span className='inline-block ml-3 bg-blue-500 px-4 py-2 rounded-2xl'>
                <a href="/user/login" className='cursor-pointer text-white hover:text-gray-200'>
                  LogIn <i className="ri-login-circle-line"></i>
                </a>
              </span>
            </p>

            <button
              type="submit" 
              name='submitbtn'
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-base md:text-lg cursor-pointer transition-colors w-full sm:w-auto"
            >
              Sign Up <i className="ri-login-box-line"></i>
            </button>
          </form>
        </div>

        <img
          src="/Login.webp"
          className="w-full max-w-md lg:max-w-xl rounded-2xl object-cover hidden md:block"
          alt="login"
        />
      </div>
    </div>
  )
}

export default RegisterSection