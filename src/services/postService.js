const postDao = require("../models/postDao");

const postRegistration = async (companyId, position, compensation, content, technologyStack) => {
    return await postDao.postRegistration(companyId, position, compensation, content, technologyStack);
}

const postEdit = async (companyId, postId, position, compensation, content, technologyStack) => {
    return await postDao.postEdit(companyId, postId, position, compensation, content, technologyStack);
}

const postDelete = async (companyId, postId) => {
    return await postDao.postDelete(companyId, postId);
}

module.exports = {
    postRegistration,
    postEdit,
    postDelete
}