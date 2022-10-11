const applicationService = require("../services/applicationService");

const applyJob = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;
    await applicationService.applyJob(postId, userId);
    res.status(201).json({ message: "APPLICATION COMPLETE" })
}

module.exports = {
    applyJob
}