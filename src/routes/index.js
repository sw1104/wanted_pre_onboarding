const express = require("express");
const router = express.Router();

const postRouter = require("./postRouter");
/**
 * @swagger
 * tags:
 *   name: Post
 *   description: 채용공고 과련 API
 */
router.use("/post", postRouter.router);

const applicationRouter = require("./applicationRouter");
/**
 * @swagger
 * tags:
 *   name: Apply
 *   description: 채용공고 지원 과련 API
 */
router.use("/apply", applicationRouter.router);

module.exports = router;