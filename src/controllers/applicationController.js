const BaseError = require("../middlewares/baseError");
const applicationService = require("../services/applicationService");

const applyJob = async (req, res) => {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!userId) throw new BaseError("KEY ERROR", 400);

    await applicationService.applyJob(postId, userId);
    res.status(201).json({ message: "APPLICATION COMPLETE" });
};

module.exports = {
    applyJob
}