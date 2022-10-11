const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
router.post("", postController.postRegistration);
router.patch("/:companyId/:postId", postController.postEdit);
router.delete("/:companyId/:postId", postController.postDelete);
router.get("", postController.getPostList);
router.get("/:search", postController.getSearchPost);
router.get("/detail/:companyId/:postId", postController.getPostDetails)

module.exports = {
    router
}