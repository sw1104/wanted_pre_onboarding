const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
router.post("", postController.postRegistration);
router.patch("/:postId", postController.postEdit);
router.delete("/:postId", postController.postDelete);
router.get("", postController.getPostList);
router.get("/:search", postController.getSearchPost);
router.get("/detail/:postId", postController.getPostDetails);

module.exports = {
    router
}