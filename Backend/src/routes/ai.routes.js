const express = require('express');

const ai = require('../controllers/ai.controller');

const authMiddleware = require("../Middlewares/auth.middleware");

const router = express.Router();

router.get('/generate/response',ai.generateResponse);

module.exports = router;