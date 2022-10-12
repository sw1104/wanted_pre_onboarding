const BaseError = require("../middlewares/baseError");
const applicationDao = require("../models/applicationDao");
const postDao = require("../models/postDao");

const applyJob = async (postId, userId) => {
    const getDuplicate = await applicationDao.getApplicationDuplicate(postId, userId)
    const postExist = await postDao.getPostExists(postId)

    if (!postExist) throw new BaseError("POST DOES NOT EXIST", 400);
    if (getDuplicate) throw new BaseError("YOU HAVE ALREADY APPLIED", 400)

    return await applicationDao.applyJob(postId, userId);
}

module.exports = {
    applyJob
}