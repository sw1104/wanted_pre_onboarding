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

    test("SUCCESS: 채용공고에 지원하기", async () => {
        await request(app)
            .post("/apply/1")
            .send({
                userId: 1
            })
            .expect(201)
            .expect({ message: "APPLICATION COMPLETE" })
    });

    test("FAILED: 채용공고에 지원하려고 하나 사용자가 없는 경우", async () => {
        await request(app)
            .post("/apply/1")
            .expect(400)
            .expect({ message: "KEY ERROR", statusCode: 400 })
    });

    test("FAILED: 채용공고에 지원하려고 하나 공고가 없는 경우", async () => {
        await request(app)
            .post("/apply/999")
            .send({
                userId: 1
            })
            .expect(400)
            .expect({ message: "POST DOES NOT EXIST", statusCode: 400 })
    });

    test("FAILED: 채용공고에 이미 지원한 경우", async () => {
        await request(app)
            .post("/apply/1")
            .send({
                userId: 1
            })
            .expect(400)
            .expect({ message: "YOU HAVE ALREADY APPLIED", statusCode: 400 })
    });
});