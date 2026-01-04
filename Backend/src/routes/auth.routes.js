const express = require('express');

const auth = require("../controllers/auth.controller")

const authMiddleware = require("../Middlewares/auth.middleware")

const router = express.Router();

//user auth routes
router.post("/user/register",auth.registerUser)
router.post("/user/login",auth.loginUser)
router.get("/user/logout",auth.logoutUser)
router.get("/user/profile",authMiddleware.authUserMiddleware,auth.getUserProfile)

//Admin auth routes
router.post("/admin/register",auth.registerAdmin)
router.post("/admin/login",auth.loginAdmin)
router.get("/admin/logout",auth.logoutAdmin)
router.get("/admin/profile",authMiddleware.authAdminMiddleware,auth.getAdminProfile)


module.exports = router;