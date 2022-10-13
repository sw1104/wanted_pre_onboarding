const express = require("express");
const router = express.Router();

const postRouter = require("./postRouter");
router.use("/post", postRouter.router);

const applicationRouter = require("./applicationRouter");
router.use("/apply", applicationRouter.router);

module.exports = router;