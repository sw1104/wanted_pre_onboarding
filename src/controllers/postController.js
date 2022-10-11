const postService = require("../services/postService");

const postRegistration = async (req, res) => {
    const { companyId, position, compensation, content, technologyStack } = req.body;
    await postService.postRegistration(companyId, position, compensation, content, technologyStack);
    res.status(201).json({ message: "Job posting completed" });
}

module.exports = {
    postRegistration
}