const express = require('express')

const Complaints = require("../controllers/complaints.controller")
const Feedback = require("../controllers/feedback.controller")
const authMiddleware = require("../Middlewares/auth.middleware")

const router = express.Router();

router.post("/add/complaints",authMiddleware.authUserMiddleware,Complaints.addcomplaints)
router.get("/get/complaints",authMiddleware.authAdminMiddleware,Complaints.getcomplaints)
router.patch("/get/complaints/:complaintId/status", authMiddleware.authAdminMiddleware, Complaints.updateComplaintStatus);
router.get("/get/complaints/:rollNumber",authMiddleware.authUserMiddleware,Complaints.getComplaintByRollNumber);
router.get("/users/complaints",Complaints.getcomplaints);

router.post("/users/feedback",authMiddleware.authUserMiddleware,Feedback.addFeedback);

module.exports = router;