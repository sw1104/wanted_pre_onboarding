const { AppDataSource } = require("./dataSource");
const Post = require("../entities/Post");
const Company = require("../entities/Company");

const postRegistration = async (companyId, position, compensation, content, technologyStack) => {
    return await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Post)
        .values({
            company_id: companyId,
            position: position,
            compensation: compensation,
            content: content,
            technology_stack: technologyStack
        })
        .execute()
}

const postEdit = async (postId, position, compensation, content, technologyStack) => {
    return await AppDataSource
        .createQueryBuilder()
        .update(Post)
        .set({
            position: position,
            compensation: compensation,
            content: content,
            technology_stack: technologyStack
        })
        .where({
            id: postId,
        })
        .execute()
}

const postDelete = async (postId) => {
    return await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Post)
        .where({
            id: postId,
        })
        .execute()
}

const getPostList = async () => {
    return await AppDataSource
        .createQueryBuilder()
        .select([
            "p.id AS postId",
            "p.position AS position",
            "p.compensation AS compensation",
            "p.technology_stack AS technologyStack",
            "c.name AS companyName",
            "c.location AS companyLocation",
            "c.region AS companyRegion"
        ])
        .from(Post, "p")
        .innerJoin(Company, "c", "p.company_id = c.id")
        .execute()
}

const getSearchPost = async (search) => {
    return await AppDataSource
        .createQueryBuilder()
        .select([
            "p.id AS postId",
            "p.position AS position",
            "p.compensation AS compensation",
            "p.technology_stack AS technologyStack",
            "c.name AS companyName",
            "c.location AS companyLocation",
            "c.region AS companyRegion"
        ])
        .from(Post, "p")
        .innerJoin(Company, "c", "p.company_id = c.id")
        .where("p.position LIKE :word", { word: `%${search}%` })
        .orWhere("p.compensation LIKE :word", { word: `%${search}%` })
        .orWhere("p.technology_stack LIKE :word", { word: `%${search}%` })
        .orWhere("c.name LIKE :word", { word: `%${search}%` })
        .orWhere("c.location LIKE :word", { word: `%${search}%` })
        .orWhere("c.region LIKE :word", { word: `%${search}%` })
        .execute()
}

const getPostDetails = async (postId) => {
    const [result] = await AppDataSource.query(
        `
        SELECT
            p.id,
            p.position,
            p.technology_stack,
            p.content,
            p.compensation,
            c.name,
            c.location,
            c.region,
            (SELECT JSON_ARRAYAGG(
                p.id
            ) FROM posts p
            WHERE p.id != ${postId} AND p.company_id = c.id
            ) AS anotherPost
        FROM posts p
        INNER JOIN companies c ON p.company_id = c.id
        WHERE p.id = ${postId};
        `)
    return result;
}

const getPostExists = async (postId) => {
    return await AppDataSource
        .getRepository(Post)
        .createQueryBuilder("posts")
        .where("posts.id = :post", { post: postId })
        .getOne()
}

module.exports = {
    postRegistration,
    postEdit,
    postDelete,
    getPostList,
    getSearchPost,
    getPostDetails,
    getPostExists
}