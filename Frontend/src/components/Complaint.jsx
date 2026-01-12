import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import { cardVariants, fadeUp } from "../animations";

const Complaint = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    department: "",
    contact: "",
    email: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const departments = [
    "Computer Science",
    "Information Technology",
    "B-com",
    "Arts",
    "Microbiology",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.rollNumber.trim())
      newErrors.rollNumber = "Roll number is required";
    if (!formData.department)
      newErrors.department = "Department is required";
    if (!formData.contact.trim())
      newErrors.contact = "Contact number is required";
    else if (!/^\d{10}$/.test(formData.contact))
      newErrors.contact = "Enter a valid 10-digit number";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (!formData.description.trim())
      newErrors.description = "Complaint description is required";
    else if (formData.description.length < 20)
      newErrors.description = "Please provide at least 20 characters";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(
        "https://ai-campusspeak.onrender.com/api/users/add/complaints",
        formData,
        { withCredentials: true }
      );

      setSubmitSuccess(true);
      setFormData({
        name: "",
        rollNumber: "",
        department: "",
        contact: "",
        email: "",
        description: "",
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      alert("Failed to submit complaint");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen py-16 bg-[url('/complaint-bg-sm.jpg')] bg-cover bg-center lg:bg-none bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative hidden lg:flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl top-10 left-10"
          />
          <motion.div
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl bottom-10 right-10"
          />

          <img
            src="/complaintCard.webp"
            alt="Complaint Illustration"
            className="relative z-10 max-w-md w-full drop-shadow-2xl rounded-4xl"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="w-full max-w-2xl mx-auto"
        >
          <motion.div variants={cardVariants} className="text-center mb-10">
            <h1 className="text-4xl font-bold text-blue-600 mb-3">
              File a Complaint
            </h1>
            <p className="text-gray-700">
              We’re here to help you. Share your concern with us.
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6"
          >
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              error={errors.name}
              onChange={handleChange}
              placeholder="Your full name"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Roll Number"
                name="rollNumber"
                value={formData.rollNumber}
                error={errors.rollNumber}
                onChange={handleChange}
                placeholder="Enter roll number"
              />

              <Select
                label="Department"
                name="department"
                value={formData.department}
                error={errors.department}
                onChange={handleChange}
                options={departments}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Contact Number"
                name="contact"
                value={formData.contact}
                error={errors.contact}
                onChange={handleChange}
                placeholder="10-digit number"
              />

              <Input
                label="Email Address"
                name="email"
                value={formData.email}
                error={errors.email}
                onChange={handleChange}
                placeholder="example@email.com"
                type="email"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Complaint Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className={`w-full p-3 border-2 rounded-lg resize-none ${errors.description
                  ? "border-red-500"
                  : "border-gray-300"
                  }`}
              />
              <div className="flex justify-between text-sm mt-1 text-gray-500">
                <span>Min 20 characters</span>
                <span>{formData.description.length}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-semibold text-lg flex justify-center items-center gap-2 transition ${isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-300 hover:bg-amber-400 text-black"
                }`}
            >
              {isSubmitting ? "Submitting..." : <> <Send /> Submit Complaint </>}
            </button>
          </motion.div>

          {submitSuccess && (
            <div className="mt-6 bg-green-500 text-white p-4 rounded-lg flex items-center gap-3">
              <CheckCircle2 />
              Complaint submitted successfully!
            </div>
          )}
        </motion.div>
      </div>
      <span className="block mt-10 text-sm text-gray-500 text-center">
        your complaint will solved within 7 working days.
      </span>
    </section>
  );
};

const Input = ({ label, error, ...props }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      {...props}
      className={`w-full p-3 border-2 rounded-lg ${error ? "border-red-500" : "border-gray-300"
        }`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const Select = ({ label, options, error, ...props }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <select
      {...props}
      className={`w-full p-3 border-2 rounded-lg ${error ? "border-red-500" : "border-gray-300"
        }`}
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Complaint;
