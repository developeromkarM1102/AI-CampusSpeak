import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, textFade, textFadeUp } from '../animations';

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault()

    const name = e.target.name.value
    const email = e.target.email.value
    const message = e.target.message.value
    

    try {
       await axios.post(
        "http://localhost:3000/api/add/users/feedback",
        { name, email, message },
        { withCredentials: true }
      )

    }
    catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <motion.section initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} className="bg-gray-100 text-black py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.h1 variants={textFade} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </motion.h1>

            <motion.p variants={textFadeUp} className="text-base sm:text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              We would love to hear from you! Whether you have questions, suggestions,
              or need assistance, feel free to reach out.
            </motion.p>

            <motion.form variants={fadeUp} className="bg-amber-50 rounded-2xl p-6 space-y-4 max-w-md mx-auto lg:mx-0">
              <motion.input variants={fadeUp}
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border-2 rounded-md"
              />

              <motion.input variants={fadeUp}
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border-2 rounded-md"
              />

              <motion.textarea variants={fadeUp}
                placeholder="What's your message?"
                rows="5"
                className="w-full p-3 border-2 rounded-md resize-none"
              />

              <motion.button variants={fadeUp}
                onAbort={handleSubmit}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-full text-lg hover:bg-green-200 hover:text-black transition"
              >
                Send Message <i className="ri-send-plane-fill ml-2"></i>
              </motion.button>
            </motion.form>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.img variants={fadeUp}
              src="/contact.webp"
              alt="Contact"
              className="w-64 sm:w-80 md:w-130 rounded-full shadow-lg"
            />
          </div>

        </div>

        <p className="text-center text-base sm:text-lg mt-12 max-w-4xl mx-auto px-4">
          If you have any questions, suggestions, or need assistance, feel free to reach out.
          We're here to help and ensure your experience with CampusSpeak is smooth and effective.
        </p>
      </motion.section>

      <section className="bg-[url('/getintouch.webp')] bg-cover bg-center py-12 px-4 text-center text-black">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          Get in Touch
        </h2>

        <div className="flex justify-center gap-8 text-3xl cursor-pointer">
          <i className="ri-instagram-line text-pink-500"></i>
          <i className="ri-whatsapp-line text-green-600"></i>
          <i className="ri-mail-ai-line text-red-500"></i>
        </div>
      </section>
    </>
  );
};

export default Contact;
