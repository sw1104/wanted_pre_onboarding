const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
/**
 * @swagger
 *  
 * /post:
 *  post:
 *    summary: "채용공고 등록"
 *    description: "POST 방식으로 채용공고를 등록한다."
 *    tags: [Post]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. 
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *                description: "채용공고 고유아이디"
 *              compensation:
 *                type: integer
 *                description: "채용 보상금"
 *              content:
 *                type: string
 *                description: "채용공고 내용"
 *              position:
 *                type: string
 *                description: "채용 포지션"
 *              technologyStack:
 *                type: string
 *                description: "채용 기술 스택"
 *    responses:
 *        "201":
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
 *                              {
 *                                  "message": "JOB POSTING COMPLETED"
 *                              }
 *                              ]
 */ 
router.post("", postController.createPost);
/**
 * @swagger
 * /post/{postId}:
 *   patch:
 *    summary: "채용공고 수정"
 *    description: "Patch 방식을 통해 특정 채용공고 수정(단일 데이터를 수정할 때 사용함)"
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: 채용공고 id
 *        schema:
 *          type: integer
 *    requestBody:
 *      description: 채용공고 수정
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              compensation:
 *                type: integer
 *                description: "채용 보상금"
 *              content:
 *                type: string
 *                description: "채용공고 내용"
 *              position:
 *                type: string
 *                description: "채용 포지션"
 *              technologyStack:
 *                type: string
 *                description: "채용 기술 스택"
 *    responses:
 *      "201":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                data:
 *                  type: string
 *                  example:
 *                    [{
 *                       "message": "POST EDITED"
 *                    }]
 */
router.patch("/:postId", postController.editPost);

/**
 * @swagger
 * /post/{postId}:
 *   delete:
 *    summary: "특정 채용공고 삭제"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: 채용공고 id
 *        schema:
 *          type: integer
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (유저 삭제)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example:
 *                    [
 *                    {
 *                        "message": "POST DELETED"
 *                    }
 *                    ]
 */
router.delete("/:postId", postController.deletePost);
/**
 * @swagger
 * paths:
 *  /post:
 *    get:
 *      summary: "전체 채용공고 조회"
 *      description: "서버에 데이터를 보내지 않고 Get방식으로 요청"
 *      tags: [Post]
 *      responses:
 *        "200":
 *          description: 전체 채용공고 조회
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
 *                          [
 *                            {
 *                              "postId": 채용공고id,
 *                              "position": "채용 포지션",
 *                              "compensation": "채용 보상금",
 *                              "technologyStack": "채용 기술 스택",
 *                              "companyName": "채용 기업",
 *                              "companyLocation": "채용 기업 국가",
 *                              "companyRegion": "채용 기업 지역"
 *                          },{
 *                              "postId": 채용공고id,
 *                              "position": "채용 포지션",
 *                              "compensation": "채용 보상금",
 *                              "technologyStack": "채용 기술 스택",
 *                              "companyName": "채용 기업",
 *                              "companyLocation": "채용 기업 국가",
 *                              "companyRegion": "채용 기업 지역"
 *                          }
 *                          ]
 */
router.get("", postController.getPostList);


/**
 * @swagger
 *  /post/{search}:
 *  get:
 *    summary: "검색어로 채용공고 조회"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: search
 *        required: true
 *        description: 검색어
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. 다음 예시는 삼성전자로 검색한 결과 입니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                post:
 *                  type: object
 *                  example: [
 *                              {
 *                                  "postId": 1,
 *                                  "position": "백엔드 주니어 개발자",
 *                                  "compensation": "1000000",
 *                                  "technologyStack": "Python",
 *                                  "companyName": "삼성전자",
 *                                  "companyLocation": "대한민국",
 *                                  "companyRegion": "경기도 수원시"
 *                              },
 *                              {
 *                                  "postId": 2,
 *                                  "position": "백엔드 시니어 개발자",
 *                                  "compensation": "1500000",
 *                                  "technologyStack": "Node.js, MySQL",
 *                                  "companyName": "삼성전자",
 *                                  "companyLocation": "대한민국",
 *                                  "companyRegion": "경기도 수원시"
 *                              },
 *                              {
 *                                  "postId": 5,
 *                                  "position": "백엔드 주니어 개발자",
 *                                  "compensation": "1000000",
 *                                  "technologyStack": "Python",
 *                                  "companyName": "삼성전자",
 *                                  "companyLocation": "대한민국",
 *                                  "companyRegion": "경기도 수원시"
 *                              },
 *                              {
 *                                  "postId": 6,
 *                                  "position": "백엔드 시니어 개발자",
 *                                  "compensation": "1500000",
 *                                  "technologyStack": "Node.js, MySQL",
 *                                  "companyName": "삼성전자",
 *                                  "companyLocation": "대한민국",
 *                                  "companyRegion": "경기도 수원시"
 *                              },
 *                              {
 *                                  "postId": 9,
 *                                  "position": "백엔드 주니어 개발자",
 *                                  "compensation": "1000000",
 *                                  "technologyStack": "Python",
 *                                  "companyName": "삼성전자",
 *                                  "companyLocation": "대한민국",
 *                                  "companyRegion": "경기도 수원시"
 *                              },
 *                              {
 *                                  "postId": 10,
 *                                  "position": "백엔드 시니어 개발자",
 *                                  "compensation": "1500000",
 *                                  "technologyStack": "Node.js, MySQL",
 *                                  "companyName": "삼성전자",
 *                                  "companyLocation": "대한민국",
 *                                  "companyRegion": "경기도 수원시"
 *                              },
 *                              {
 *                                  "postId": 13,
 *                                  "position": "백엔드 주니어 개발자",
 *                                  "compensation": "1000000",
 *                                  "technologyStack": "Python",
 *                                  "companyName": "삼성전자",
 *                                  "companyLocation": "대한민국",
 *                                  "companyRegion": "경기도 수원시"
 *                              },
 *                              {
 *                                  "postId": 14,
 *                                  "position": "백엔드 시니어 개발자",
 *                                  "compensation": "1500000",
 *                                  "technologyStack": "Node.js, MySQL",
 *                                  "companyName": "삼성전자",
 *                                  "companyLocation": "대한민국",
 *                                  "companyRegion": "경기도 수원시"
 *                              }
 *                          ]
 */
router.get("/:search", postController.getSearchPost);
/**
 * @swagger
 *  /post/detail/{postId}:
 *  get:
 *    summary: "채용공고 상세 조회"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Post]
 *    parameters:
 *      - in: path
 *        name: postId
 *        required: true
 *        description: 채용공고 id
 *        schema:
 *          type: integer
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. 채용공고 상세페이지에는 해당 기업에서 올린 다른 채용공고의 id도 포함됩니다.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                post:
 *                  type: object
 *                  example: [{
 *                              "id": 1,
 *                              "position": "백엔드 주니어 개발자",
 *                              "technology_stack": "Python",
 *                              "content": "백엔드 신입 개발자 대규모 채용",
 *                              "compensation": "1000000",
 *                              "name": "삼성전자",
 *                              "location": "대한민국",
 *                              "region": "경기도 수원시",
 *                              "anotherPost": [
 *                                  2,
 *                                  5,
 *                                  6,
 *                                  9,
 *                                  10,
 *                                  13,
 *                                  14
 *                              ]
 *                          }]
 */
router.get("/detail/:postId", postController.getPostDetails);

module.exports = {
    router
}