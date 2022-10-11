const postService = require("../services/postService");
const baseError = require("../middlewares/baseError");

const postRegistration = async (req, res) => {
    const { companyId, position, compensation, content, technologyStack } = req.body;

    if (!companyId || !position || !compensation || !content || !technologyStack) throw new baseError("KEY ERROR", 400)

    await postService.postRegistration(companyId, position, compensation, content, technologyStack);
    res.status(201).json({ message: "Job posting completed" });
}

const postEdit = async (req, res) => {
    const { companyId, postId } = req.params;
    const { position, compensation, content, technologyStack } = req.body;

    if (!companyId || !postId) throw new baseError("KEY ERROR", 400)

    await postService.postEdit(companyId, postId, position, compensation, content, technologyStack)
    res.status(201).json({ messgae: "Post edited" })
}

module.exports = {
    postRegistration,
    postEdit
}