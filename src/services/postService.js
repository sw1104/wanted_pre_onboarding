const BaseError = require("../middlewares/baseError");
const postDao = require("../models/postDao");

const postRegistration = async (companyId, position, compensation, content, technologyStack) => await postDao.postRegistration(companyId, position, compensation, content, technologyStack);

const postEdit = async (postId, position, compensation, content, technologyStack) => {
    const postExist = await postDao.getPostExists(postId)

    if (!postExist) throw new BaseError("POST DOES NOT EXIST", 400);

    return await postDao.postEdit(postId, position, compensation, content, technologyStack);
}

const postDelete = async (postId) => {
    const postExist = await postDao.getPostExists(postId)

    if (!postExist) throw new BaseError("POST DOES NOT EXIST", 400);

    return await postDao.postDelete(postId);
}

const getPostList = async () => await postDao.getPostList();

const getSearchPost = async (search) => {
    const result = await postDao.getSearchPost(search);

    if (result.length === 0) throw new BaseError("NO RESULTS WERE FOUND FOR YOUR SEARCH.", 400);

    return result;
}

const getPostDetails = async (postId) => {
    const postExist = await postDao.getPostExists(postId)

    if (!postExist) throw new BaseError("POST DOES NOT EXIST", 400);

    return await postDao.getPostDetails(postId);
}


module.exports = {
    postRegistration,
    postEdit,
    postDelete,
    getPostList,
    getSearchPost,
    getPostDetails
}