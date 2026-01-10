import { useEffect, useState } from "react";
import axios from 'axios';
import {motion} from 'framer-motion';
import { fadeUp ,textFadeUp} from "../animations";

const ComplaintDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [updating, setUpdating] = useState(null);
  const [GetSolution, setGetSolution] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("https://ai-campusspeak.onrender.com/api/users/get/complaints", {
        withCredentials: true
      });
      console.log("Complaints:", res.data.data);
      setComplaints(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setLoading(false);
    }
  };

  const updateStatus = async (complaintId, newStatus) => {
    setUpdating(complaintId);

    try {
      const response = await axios.patch(
        `https://ai-campusspeak.onrender.com/api/users/get/complaints/${complaintId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      console.log("Update response:", response.data);


      setComplaints(prev =>
        prev.map(c =>
          c._id === complaintId ? { ...c, status: newStatus } : c
        )
      );
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      alert("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  const fetchSolution = async (complaintId) => {
    try {
      const response = await axios.get(
        `https://ai-campusspeak.onrender.com/api/ai/generate/response/${complaintId}`,
        { withCredentials: true }
      );
      setGetSolution(response.data.solution);
    } catch (error) {
      console.error("Fetch solution error:", error.response?.data || error.message);
      alert("Failed to fetch solution");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const filteredComplaints = complaints.filter(c => {
    if (filter === "all") return true;
    return (c.status || "pending") === filter;
  });

  const statusCounts = {
    all: complaints.length,
    pending: complaints.filter(c => (c.status || "pending") === "pending").length,
    "in-progress": complaints.filter(c => c.status === "in-progress").length,
    resolved: complaints.filter(c => c.status === "resolved").length,
    rejected: complaints.filter(c => c.status === "rejected").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-xl text-gray-600">Loading complaints...</div>
      </div>
    );
  }

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{once: true}}  className="min-h-screen bg-cyan-100 p-6">

      <div className="max-w-7xl mx-auto mb-8 mt-20 text-center">
        <h1 className="text-4xl font-bold text-gray-800 ">Complaint Dashboard</h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <motion.div variants={fadeUp}
          onClick={() => setFilter("all")}
          className={`p-6 rounded-lg shadow cursor-pointer transition ${filter === "all" ? "bg-indigo-600 text-white" : "bg-white text-gray-800"
            }`}
        >
          <h3 className="text-sm font-semibold mb-2">Total Complaints</h3>
          <p className="text-3xl font-bold">{statusCounts.all}</p>
        </motion.div>

        <motion.div variants={fadeUp}
          onClick={() => setFilter("pending")}
          className={`p-6 rounded-lg shadow cursor-pointer transition ${filter === "pending" ? "bg-yellow-500 text-white" : "bg-white text-gray-800"
            }`}
        >
          <h3 className="text-sm font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold">{statusCounts.pending}</p>
        </motion.div>

        <motion.div variants={fadeUp}
          onClick={() => setFilter("in-progress")}
          className={`p-6 rounded-lg shadow cursor-pointer transition ${filter === "in-progress" ? "bg-blue-500 text-white" : "bg-white text-gray-800"
            }`}
        >
          <h3 className="text-sm font-semibold mb-2">In Progress</h3>
          <p className="text-3xl font-bold">{statusCounts["in-progress"]}</p>
        </motion.div>

        <motion.div variants={fadeUp}
          onClick={() => setFilter("resolved")}
          className={`p-6 rounded-lg shadow cursor-pointer transition ${filter === "resolved" ? "bg-green-500 text-white" : "bg-white text-gray-800"
            }`}
        >
          <h3 className="text-sm font-semibold mb-2">Resolved</h3>
          <p className="text-3xl font-bold">{statusCounts.resolved}</p>
        </motion.div>

        <motion.div variants={fadeUp}
          onClick={() => setFilter("rejected")}
          className={`p-6 rounded-lg shadow cursor-pointer transition ${filter === "rejected" ? "bg-red-500 text-white" : "bg-white text-gray-800"
            }`}
        >
          <h3 className="text-sm font-semibold mb-2">Rejected</h3>
          <p className="text-3xl font-bold">{statusCounts.rejected}</p>
        </motion.div>
      </div>

      <motion.div variants={textFadeUp} className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          {filter === "all" ? "All Complaints" : `${filter.charAt(0).toUpperCase() + filter.slice(1).replace("-", " ")} Complaints`}
        </h2>

        <div className="space-y-4">
          {filteredComplaints.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{c.name}</h3>
                  <p className="text-sm text-gray-600">Roll No: {c.rollNumber}</p>
                  <p className="text-sm text-gray-600">Dept: {c.department}</p>
                  <p className="text-sm text-gray-600">Mobile: {c.contact}</p>
                  <p className="text-sm text-gray-600">Email: {c.email}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(c.status || "pending")}`}>
                    {(c.status || "pending").toUpperCase().replace("-", " ")}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Complaint:</p>
                <p className="text-gray-700">{c.description}</p>
              </div>

              <div className="flex justify-between items-center">
                <a
                  href={c.proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  📎 View proof
                </a>

                <div className="flex gap-2">
                  <select
                    value={c.status || "pending"}
                    onChange={(e) => updateStatus(c._id, e.target.value)}
                    disabled={updating === c._id}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  {updating === c._id && (
                    <span className="text-sm text-gray-500">Updating...</span>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => fetchSolution(c._id)}
                    className="ml-4 px-3 py-2 bg-green-500 text-white rounded-2xl text-sm hover:bg-purple-400 transition"
                  >
                    Get AI Solution
                  </button>
                  {GetSolution && (
                    <div className="mt-2 p-2 bg-gray-100 rounded">
                      <h4 className="font-semibold text-gray-800">AI Suggested Solution:</h4>
                      <p className="text-gray-700">{GetSolution}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}


          {filteredComplaints.length === 0 && (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500 text-lg">No complaints found</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComplaintDashboard;