const baseError = require("../middlewares/baseError");
const applicationDao = require("../models/applicationDao");

const applyJob = async (postId, userId) => {
    const getDuplicate = await applicationDao.getApplicationDuplicate(postId, userId)

    if (getDuplicate) throw new baseError("YOU HAVE ALREADY APPLIED.", 400)

    return await applicationDao.applyJob(postId, userId);
}

module.exports = {
    applyJob
}