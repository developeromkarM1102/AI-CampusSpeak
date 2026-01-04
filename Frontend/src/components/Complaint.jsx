import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { cardVariants, fadeUp } from '../animations';
const Complaint = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    contact: '',
    email: '',
    description: ''
  }); 

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const departments = [
    'Computer Science',
    'Information Technology',
    'B-com',
    'Arts',
    'Microbiology',
    'Other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.rollNumber.trim()) newErrors.rollNumber = 'Roll number is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required';
    else if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Enter a valid 10-digit number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.description.trim()) newErrors.description = 'Complaint description is required';
    else if (formData.description.length < 20) newErrors.description = 'Please provide at least 20 characters';
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
      await axios.post('http://localhost:3000/api/users/add/complaints', formData);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        rollNumber: '',
        department: '',
        contact: '',
        email: '',
        description: ''
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch {
      alert('Failed to submit complaint');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-[url('/image.png')] bg-cover bg-center w-full py-16 px-4">
      <motion.div initial="hidden" whileInView="visible" viewport={{once: true}} className="max-w-2xl mx-auto">

        <motion.div variants={cardVariants} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 mb-3">
            File a Complaint
          </h1>
          <p className="text-purple-500 text-sm sm:text-base">
            We're here to help. Share your concerns with us.
          </p>
        </motion.div>

        <motion.div variants={cardVariants} className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
          
         
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
              Complaint Description <i className="ri-message-ai-3-line"></i>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className={`w-full p-3 border-2 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between text-sm mt-1">
              <span className="text-gray-500">Min 20 characters</span>
              <span className="text-gray-500">{formData.description.length}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-semibold text-lg flex justify-center items-center gap-2 transition ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-cyan-300 hover:bg-amber-500 text-black'
            }`}
          >
            {isSubmitting ? 'Submitting...' : <> <Send /> Submit Complaint </>}
          </button>
        </motion.div>

        {submitSuccess && (
          <div className="mt-6 bg-green-500 text-white p-4 rounded-lg flex items-center gap-3">
            <CheckCircle2 />
            Complaint submitted successfully!
          </div>
        )}

        <p className="text-center text-fuchsia-500 mt-6 text-sm">
          Your complaint will be reviewed within 24–48 hours.
        </p>

      </motion.div>
    </section>
  );
};

const Input = ({ label, error, ...props }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      {...props}
      className={`w-full p-3 border-2 rounded-lg ${
        error ? 'border-red-500' : 'border-gray-300'
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
      className={`w-full p-3 border-2 rounded-lg ${
        error ? 'border-red-500' : 'border-gray-300'
      }`}
    >
      <option value="">Select</option>
      {options.map(o => <option key={o}>{o}</option>)}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Complaint;
