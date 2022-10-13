const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
router.post("", postController.createPost);
router.patch("/:postId", postController.editPost);
router.delete("/:postId", postController.deletePost);
router.get("", postController.getPostList);
router.get("/:search", postController.getSearchPost);
router.get("/detail/:postId", postController.getPostDetails);

module.exports = {
    router
}