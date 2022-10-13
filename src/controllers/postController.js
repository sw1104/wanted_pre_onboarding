const postService = require("../services/postService");
const BaseError = require("../middlewares/BaseError");

const postRegistration = async (req, res) => {
    const { companyId, position, compensation, content, technologyStack } = req.body;

    if (!companyId || !position || !compensation || !content || !technologyStack) throw new BaseError("KEY ERROR", 400);

    await postService.postRegistration(companyId, position, compensation, content, technologyStack);
    res.status(201).json({ message: "JOB POSTING COMPLETED" });
}

const postEdit = async (req, res) => {
    const { postId } = req.params;
    const { position, compensation, content, technologyStack } = req.body;

    await postService.postEdit(postId, position, compensation, content, technologyStack);
    res.status(201).json({ message: "POST EDITED" });
}

const postDelete = async (req, res) => {
    const { postId } = req.params;
    await postService.postDelete(postId);
    res.status(200).json({ message: "POST DELETED" });
}

const getPostList = async (req, res) => {
    const data = await postService.getPostList();
    res.status(200).json(data);
}

const getSearchPost = async (req, res) => {
    const { search } = req.params;
    const data = await postService.getSearchPost(search);
    res.status(200).json(data);
}

const getPostDetails = async (req, res) => {
    const { postId } = req.params;
    const data = await postService.getPostDetails(postId);
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