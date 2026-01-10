import {motion} from 'framer-motion';
import { fadeUp, textFade, textFadeUp } from '../animations';
import { useState } from 'react';
import axios from 'axios';

const CheckComplaints = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setComplaints([]);

    if (!rollNumber) {
      setError("Please enter your roll number");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `https://ai-campusspeak.onrender.com/api/users/get/complaints/${rollNumber}`
      );
      setComplaints(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "No complaints found");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "text-yellow-600";
      case "reviewed": return "text-blue-600";
      case "solved": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <motion.section initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} className="bg-gray-100 text-black py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">

        <motion.div variants={fadeUp} className="flex justify-center lg:w-1/2">
          <img
            src="/checkcomplaint.webp"
            alt="Check Complaint"
            className="w-64 sm:w-80 md:w-96 rounded-2xl shadow-lg"
          />
        </motion.div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">

          <motion.h1 variants={textFade} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Check Complaints
          </motion.h1>

          <motion.p variants={textFadeUp} className="text-base sm:text-lg mb-6 max-w-xl mx-auto lg:mx-0">
            Track the status of your complaints using your roll number.
          </motion.p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center lg:items-start gap-4 max-w-sm mx-auto lg:mx-0"
          >
            <motion.input variants={fadeUp}
              type="text"
              placeholder="Enter your Roll Number"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="w-full p-3 border-2 rounded-md"
            />

            <motion.button variants={fadeUp}
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-200 hover:text-black transition"
            >
              {loading ? "Checking..." : "Check Status"}
              <i className="ri-chat-check-line ml-2"></i>
            </motion.button>
          </form>

          {error && <p className="text-red-600 mt-4">{error}</p>}

          {complaints.length > 0 && (
            <div className="mt-8 space-y-4">
              {complaints.map((complaint, index) => (
                <div
                  key={complaint._id}
                  className="bg-gray-100 p-4 rounded-xl text-left"
                >
                  <p className="font-bold mb-1">
                    Complaint #{index + 1}
                  </p>
                  <p className="mb-1">
                    <b>Description:</b> {complaint.description}
                  </p>
                  <p>
                    <b>Status:</b>{" "}
                    <span className={`font-bold ${getStatusColor(complaint.status)}`}>
                      {complaint.status.toUpperCase()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </motion.section>
  );
};

export default CheckComplaints;
