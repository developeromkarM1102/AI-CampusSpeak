import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, textFade, textFadeUp } from '../animations';

const About = () => {
  return (
    <motion.section initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} className="bg-gray-100 text-black py-16 px-4 sm:px-8 lg:px-20">

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        <motion.div variants={fadeUp} className="flex justify-center lg:w-1/2 border-2 border-gray-300">
          <img
            src="/about.png"
            alt="About CampusSpeak"
            className="w-64 sm:w-80 md:w-96 lg:w-105 rounded-full shadow-lg "
          />
        </motion.div>

        <div className="text-center lg:text-left lg:w-1/2">
          <motion.h1 variants={textFadeUp} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            About CampusSpeak
          </motion.h1>

          <motion.p variants={textFade} className="text-purple-500 text-sm sm:text-base md:text-lg leading-relaxed mb-6 max-w-xl mx-auto lg:mx-0">
            CampusSpeak is a dedicated platform designed to bridge the communication gap between students and the administration. Our mission is to empower students to voice their concerns, share suggestions, and contribute to the betterment of the campus environment.
          </motion.p>

          <div className="flex justify-center lg:justify-start mb-6">
            <i className="ri-separator text-4xl text-gray-500"></i>
          </div>

          <motion.h2 variants={textFadeUp} className="text-2xl sm:text-3xl font-semibold mb-4">
            Our Mission
          </motion.h2>

          <motion.p variants={textFade} className="text-purple-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
            At CampusSpeak, we believe in fostering a collaborative campus community where students and administration work together to create a positive and inclusive environment. Our platform facilitates open communication, encourages feedback, and promotes transparency.
          </motion.p>
        </div>

      </div>
    </motion.section>
  );
};

export default About;
