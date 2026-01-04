const ComplaintModel = require('../models/complaints.model')

async function addcomplaints(req, res) {

    const { name, rollNumber, department, email, contact, description } = req.body;

    const complaint = new ComplaintModel({
        name,
        rollNumber,
        department,
        email,
        contact,
        description
    })

    const saveComplaint = await complaint.save();

    if (!saveComplaint) {
        return res.status(400).json({
            message: "complaint are not saved in database"
        })
    }

    return res.status(201).json({
        message: "complaint are saved to database",
        data: saveComplaint
    })
}

async function getcomplaints(req, res) {

    const Complaints = await ComplaintModel.find();

    if (!Complaints) {
        return res.status(400).json({
            message: "failed to fetch complaints"
        })
    }

    return res.status(201).json({
        message: "complaints are successfully fetched",
        data: Complaints
    })
}

async function updateComplaintStatus(req, res) {
    const { complaintId } = req.params;
    const { status } = req.body;
    try {

        if (!["pending", "in-progress", "resolved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const complaint = await ComplaintModel.findById(complaintId);
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }
        complaint.status = status;
        await complaint.save();
        return res.status(200).json({ message: "Complaint status updated", data: complaint });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function getComplaintByRollNumber(req, res) {
  try {
    const { rollNumber } = req.params;

    const complaints = await ComplaintModel.find({ rollNumber });

    if (complaints.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No complaints found for this roll number"
      });
    }

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
}

module.exports = {
    addcomplaints,
    getcomplaints,
    updateComplaintStatus,
    getComplaintByRollNumber
}