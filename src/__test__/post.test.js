const request = require("supertest");

const { createApp } = require("../../app")
const { AppDataSource } = require("../models/dataSource")

describe("post unit test", () => {
    let app;

    beforeAll(async () => {
        app = createApp()
        await AppDataSource.initialize()
        await AppDataSource.query(
            `
            INSERT INTO posts(
                company_id,
                position,
                compensation,
                content,
                technology_stack
            ) VALUES 
                (1, "백엔드 주니어 개발자", 1000000, "백엔드 신입 개발자 대규모 채용", "Python"),
                (1, "백엔드 시니어 개발자", 1500000, "백엔드 7년차 이상 경력직 채용", "Node.js, MySQL"),
                (2, "프론트엔드 주니어 개발자", 500000, "프론트엔드 신입 개발자 채용", "React"),
                (3, "프론트엔드 시니어 개발자", 1350000, "프론트엔드 시니어 개발자 채용", "React, MySQL");
            `
        )
    });

    afterAll(async () => {
        await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 0`)
        await AppDataSource.query(`TRUNCATE applications`)
        await AppDataSource.query(`TRUNCATE posts`)
        await AppDataSource.query(`SET FOREIGN_KEY_CHECKS = 1`)
        await AppDataSource.destroy()
    });

    test("SUCCESS: 채용공고 등록", async () => {
        await request(app)
            .post("/post")
            .send({
                companyId: 3,
                position: "풀스택 개발자 모집",
                compensation: 3000000,
                content: "세계 최고의 기업에서 풀스택 개발자를 모집합니다.",
                technologyStack: "Javascript, Node.js, React, MySQL, GO, Python, Django"
            })
            .expect(201)
            .expect({ message: "JOB POSTING COMPLETED" })
    });

    test("FAILED: 채용공고 등록 값 누락", async () => {
        await request(app)
            .post("/post")
            .send({
                companyId: 3,
                position: "풀스택 개발자 모집",
                compensation: 3000000,
                content: "세계 최고의 기업에서 풀스택 개발자를 모집합니다.",
            })
            .expect(400)
            .expect({ message: "KEY ERROR", statusCode: 400 })
    });

    test("SUCCESS: 채용공고 수정", async () => {
        await request(app)
            .patch("/post/1")
            .send({
                position: "백엔드 시니어 개발자",
            })
            .expect(201)
            .expect({ message: "POST EDITED" })
    });

    test("FAILED: 채용공고 수정", async () => {
        await request(app)
            .patch("/post/999")
            .send({
                position: "백엔드 시니어 개발자",
            })
            .expect(400)
            .expect({ message: "POST DOES NOT EXIST", statusCode: 400 })
    });

    test("SUCCESS: 모든 채용공고 가져오기", async () => {
        await request(app)
            .get("/post")
            .expect(200)
    });

    test("SUCCESS: 채용공고 삭제", async () => {
        await request(app)
            .delete("/post/2")
            .expect(200)
            .expect({ message: "POST DELETED" })
    });

    test("FAILED: 채용공고 삭제", async () => {
        await request(app)
            .delete("/post/999")
            .expect(400)
            .expect({ message: "POST DOES NOT EXIST", statusCode: 400 })
    });

    test("SUCCESS: 검색된 결과 가져오기", async () => {
        await request(app)
            .get("/post/Node")
            .expect(200)
    });

    test("FAILED: 검색된 결과가 없는 경우", async () => {
        await request(app)
            .get("/post/C++")
            .expect(400)
            .expect({ message: "NO RESULTS WERE FOUND FOR YOUR SEARCH.", statusCode: 400 })
    });

    test("SUCCESS: 채용공고 상세 페이지", async () => {
        await request(app)
            .get("/post/detail/1")
            .expect(200)
    });

    test("FAILED: 채용공고 상세페이지를 보려고 하지만 글이 없는 경우", async () => {
        await request(app)
            .get("/post/detail/999")
            .expect(400)
            .expect({ message: "POST DOES NOT EXIST", statusCode: 400 })
    });
});