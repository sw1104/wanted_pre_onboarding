const postService = require("../services/postService");
const baseError = require("../middlewares/baseError");

const postRegistration = async (req, res) => {
    const { companyId, position, compensation, content, technologyStack } = req.body;

    if (!companyId || !position || !compensation || !content || !technologyStack) throw new baseError("KEY ERROR", 400)

    await postService.postRegistration(companyId, position, compensation, content, technologyStack);
    res.status(201).json({ message: "JOB POSTING COMPLETED" });
}

const postEdit = async (req, res) => {
    const { companyId, postId } = req.params;
    const { position, compensation, content, technologyStack } = req.body;

    if (!companyId || !postId) throw new baseError("KEY ERROR", 400)

    await postService.postEdit(companyId, postId, position, compensation, content, technologyStack)
    res.status(201).json({ messgae: "POST EDITED" })
}

const postDelete = async (req, res) => {
    const { companyId, postId } = req.params;
    if (!companyId || !postId) throw new baseError("KEY ERROR", 400)

    await postService.postDelete(companyId, postId)
    res.status(200).json({ message: "POST DELETED" })
}

const getPostList = async (req, res) => {
    const data = await postService.getPost();
    res.status(200).json(data);
}

const getSearchPost = async (req, res) => {
    const { search } = req.params;
    const data = await postService.getSearchPost(search);
    res.status(200).json(data);
}

const getPostDetails = async (req, res) => {
    const { companyId, postId } = req.params;
    const data = await postService.getPostDetails(companyId, postId);
    res.status(200).json(data);
}


module.exports = {
    postRegistration,
    postEdit,
    postDelete,
    getPostList,
    getSearchPost,
    getPostDetails
}