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

const postEdit = async (companyId, postId, position, compensation, content, technologyStack) => {
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
            company_id: companyId
        })
        .execute()
}

const postDelete = async (companyId, postId) => {
    return await AppDataSource
        .createQueryBuilder()
        .delete()
        .from(Post)
        .where({
            id: postId,
            company_id: companyId
        })
        .execute()
}

const getPost = async () => {
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

module.exports = {
    postRegistration,
    postEdit,
    postDelete,
    getPost,
    getSearchPost
}