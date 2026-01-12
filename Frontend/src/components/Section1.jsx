import React from 'react';
import { motion } from 'framer-motion'
import { containerVariants, cardVariants, fadeUp, popIcon } from '../animations';

const Section1 = ({ complaints = [] }) => {

  const handleScroll = () => {
    document.getElementById("complaint-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll1 = () => {
    document.getElementById("check-complaints")?.scrollIntoView({ behavior: "smooth" });
  };

  const totalComplaints = complaints.length;
  const reviewedComplaints = complaints.filter(c => c.status === "in-progress").length;
  const solvedComplaints = complaints.filter(c => c.status === "resolved").length;

  return (
    <div className="relative min-h-screen bg-[url('/home2.jpeg')] bg-cover bg-center w-full md:bg-[url('/home.webp')] items-center justify-center ">

      <div className="absolute inset-0 bg-black/40"></div>

      <main className="relative z-10 px-4 sm:px-6 lg:px-12">

        <section className="text-center pt-28 sm:pt-32 text-white">
          <motion.h1 initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              ease: "easeOut"
            }}
            whileHover={{ color: "orange", scale: 1.03 }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 font-poppins [-webkit-text-stroke:1px_black]">
            Welcome to CampusSpeak
            <span className="block sm:inline ml-2">
              <i className="ri-megaphone-line text-green-500"></i>
            </span>
          </motion.h1>

          <div className="text-4xl sm:text-5xl md:text-6xl text-orange-400 mb-6 [-webkit-text-stroke:1px_black]">
            <i className="ri-user-voice-fill"></i>
          </div>

          <motion.p whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3, ease: "easeOut" }} className="text-sm sm:text-base md:text-lg bg-black/40 px-4 py-2 rounded-md inline-block max-w-xl mx-auto">
            Your platform to connect, share, and give suggestions to the Respected Principal Mam.
          </motion.p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <motion.button
              onClick={handleScroll}
              whileHover={{ scale: 0.9 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="w-full sm:w-auto bg-blue-600 px-6 py-3 rounded-full text-base sm:text-lg hover:bg-green-200 hover:text-black transition"
            >
              Raise your Complaint<i className="ri-file-edit-fill ml-1"></i>
            </motion.button>

            <motion.button
              onClick={handleScroll1}
              whileHover={{ scale: 0.9 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className="w-full sm:w-auto bg-blue-600 px-6 py-3 rounded-full text-base sm:text-lg hover:bg-green-200 hover:text-black transition"
            >
              Track complaint status<i className="ri-file-paper-2-fill ml-1"></i>
            </motion.button>
          </div>
        </section>

        <motion.div variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-20 place-items-center">
          {[
            { title: "Reviewed", icon: "ri-search-eye-line", text: "All the complaints under solving.", stats: reviewedComplaints },
            { title: "Total Complaints", icon: "ri-file-edit-fill", text: "Complaints filed till now.", stats: totalComplaints },
            { title: "Solved", icon: "ri-check-double-fill", text: "Complaints solved successfully.", stats: solvedComplaints },
          ].map((item, index) => (
            <motion.div variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.05
              }} key={index} className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xs text-center">
              <h2 className="font-bold text-lg sm:text-xl mb-2">
                {item.title} <i className={item.icon}></i>
              </h2>
              <h1 className="text-blue-500 text-4xl sm:text-5xl font-bold">{item.stats}</h1>
              <p className="text-sm text-gray-600 mt-4">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.section variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} className="text-center text-white mt-24 pb-16 px-4">
          <motion.h2 variants={fadeUp}className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6">
            Why Choose CampusSpeak?
          </motion.h2>
          <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-gray-200 text-sm sm:text-base">
            CampusSpeak provides a seamless way for students to voice their concerns directly to the administration.
          </motion.p>
          <motion.div variants={popIcon} className="text-4xl sm:text-5xl mt-6">
            <i className="ri-voiceprint-line"></i>
          </motion.div>
        </motion.section>

      </main>
    </div>
  );
};

export default Section1;
