const BaseError = require("../middlewares/baseError");
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

const getPost = async () => {
    return await postDao.getPost();
}

const getSearchPost = async (search) => {
    const result = await postDao.getSearchPost(search);
    if (result.length === 0) throw new BaseError("NO RESULTS WERE FOUND FOR YOUR SEARCH.", 400);

    return result;
}

module.exports = {
    postRegistration,
    postEdit,
    postDelete,
    getPost,
    getSearchPost
}