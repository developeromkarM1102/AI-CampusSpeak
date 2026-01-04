const FeedbackModel = require('../models/feedback.model');

async function addFeedback(req,res){
    const {name , email , message} = req.body;

    const feedback = new FeedbackModel({
        name,
        email,
        message
    })
    const saveFeedback = await feedback.save();

    if(!saveFeedback){
        return res.status(400).json({
            message : "feedback are not saved in database"
        })
    }
    return res.status(201).json({
        message : "feedback are saved to database",
        data : saveFeedback
    })
}

module.exports = {
    addFeedback
}
