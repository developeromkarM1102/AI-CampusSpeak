const userModel = require("../models/user.model")
const adminModel = require("../models/admin.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ComplaintModel = require("../models/complaints.model");

//this is for users only
async function registerUser(req, res) {

    const { fullName, lastName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        lastName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.USER_JWT_KEY)

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",

    });


    res.status(201).json({
        message: "user registered Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            lastName: user.lastName
        }
    })
}

async function loginUser(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.USER_JWT_KEY)

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",

    });


    res.status(201).json({
        message: "user logged in Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

function logoutUser(req, res) {
    res.clearCookie("token",{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.status(200).json({
        message: "user logged out successfully"
    });
}

//this is for Admin only
async function registerAdmin(req, res) {

    const { fullName, email, password } = req.body;

    const isadminAlreadyExists = await adminModel.findOne({
        email
    })

    if (isadminAlreadyExists) {
        return res.status(400).json({
            message: "Admin already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await adminModel.create({
        fullName,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: admin._id,
    }, process.env.ADMIN_JWT_KEY)

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",

    });


    res.status(201).json({
        message: "Admin registered Successfully",
        admin: {
            _id: admin._id,
            email: admin.email,
            fullName: admin.fullName
        }
    })
}

async function loginAdmin(req, res) {

    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email
    })

    if (!admin) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: admin._id,
    }, process.env.ADMIN_JWT_KEY)

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",

    });


    res.status(201).json({
        message: "Admin logged in Successfully",
        admin: {
            _id: admin._id,
            email: admin.email,
            fullName: admin.fullName
        }
    })
}

function logoutAdmin(req, res) {

    res.clearCookie("token",{
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    res.status(200).json({
        message: "Admin logged out Successfully"
    })
}

async function getUserProfile(req, res) {
    try {
        const user = await userModel
            .findById(req.user._id)
            .select("-password");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }

}

async function getAdminProfile(req, res) {
    try {
        const admin = await adminModel
            .findById(req.admin._id)
            .select("-password");

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    getAdminProfile
}
