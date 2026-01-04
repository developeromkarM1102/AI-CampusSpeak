const adminModel = require("../models/admin.model")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");


async function authAdminMiddleware(req, res, next) {

    const token = req.cookies.token;
   
    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ADMIN_JWT_KEY)

        console.log("Admin Token");

        const admin = await adminModel.findById(decoded.id);

        req.admin = admin

        next()

        console.log("=== Admin Middleware Completed ===");

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

async function authUserMiddleware(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.USER_JWT_KEY)

        const user = await userModel.findById(decoded.id);

        req.user = user

        next()

    } catch (err) {

        return res.status(401).json({
            message: "Invalid token"
        })

    }

}

module.exports = {
    authAdminMiddleware,
    authUserMiddleware
}