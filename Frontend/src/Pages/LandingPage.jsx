import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';

import "remixicon/fonts/remixicon.css";
import Navbar from '../components/Navbar';
import Section1 from '../components/Section1';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Complaint from '../components/Complaint';
import CheckComplaints from '../components/CheckComplaints';
import Profile from '../components/profile';
const LandingPage = () => {

  const [complaints, setComplaints] = useState([]);

useEffect(() => {
  fetchComplaints();
}, []);

const fetchComplaints = async () => {
  const res = await axios.get("https://ai-campusspeak.onrender.com/api/stats/users/complaints");
  setComplaints(res.data.data);
};

  return (
    <div>
      <Navbar />
        
        <div id="home">
        <Section1 complaints={complaints} />
        </div>

        <div id="about">
        <About />
        </div>

        <div id="complaint-section">
        <Complaint />
        </div>

        <div id="check-complaints">
        <CheckComplaints />
        </div>

        <div id="contact">
        <Contact />
        </div>

        <Footer />

    </div>
  )
}

export default LandingPage
