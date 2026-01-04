import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminProfile from '../components/AdminProfile'

const AdminProfilePage = () => {
  return (
    <div>
      <Navbar/>
        <AdminProfile/>
      <Footer/>
    </div>
  )
}

export default AdminProfilePage
