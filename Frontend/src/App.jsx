import React from 'react'
import './App.css'
import "remixicon/fonts/remixicon.css";

import {Route, Routes} from 'react-router-dom'
import LandingPage from './Pages/LandingPage';
import DashboardPage from './Pages/DashboardPage';
import UserLoginPage from './Pages/UserLoginPage';
import UserRegisterPage from './Pages/UserRegisterPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminRegisterPage from './Pages/AdminRegisterPage';
import UserProfilePage from './Pages/UserProfilePage';
import AdminProfilePage from './Pages/AdminProfilePage';
import NotFound from './Pages/notFound';



const App = () => {
  return (
    <div>
      <Routes>
        <Route path = '/' element={<LandingPage/>}/>
        <Route path ='/Dashboard' element={<DashboardPage/>}/>
        <Route path="/user/login" element={<UserLoginPage/>}/>
        <Route path='/user/register' element={<UserRegisterPage/>}/>
        <Route path='/admin/login' element={<AdminLoginPage/>}/>
        <Route path='/admin/register' element={<AdminRegisterPage/>}/>
        <Route path='/user/profile' element={<UserProfilePage/>}/>
        <Route path='/admin/profile' element={<AdminProfilePage/>}/>
        <Route path='*' element={<NotFound/>}/>
        
      </Routes>
    </div>
  )
}

export default App
