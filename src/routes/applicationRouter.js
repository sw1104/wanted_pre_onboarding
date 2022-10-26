const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");
/**
 * @swagger
 *  
 * /apply/{postId}:
 *  post:
 *    summary: "채용 지원하기"
 *    description: "POST 방식으로 채용공고에 지원한다."
 *    tags: [Apply]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: 채용공고 id
 *        schema:
 *          type: integer
 *      - in: query
 *        name: userId
 *        required: true
 *        description: 유저 아이디
 *        schema:
 *          type: integer
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (사용자는 하나의 채용공고에 한번만 지원 가능)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                description: "유저 아이디"
 *    responses:
 *        "200":
 *          description: 채용공고 등록
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    post:
 *                      type: object
 *                      example:
 *                              [
*                                {
*                                    "message": "APPLICATION COMPLETE"
*                                }
 *                              ]
 */ 
router.post("/:postId", applicationController.applyJob);

module.exports = {
    router
}