const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");
router.post("/:postId", applicationController.applyJob);

module.exports = {
    router
}