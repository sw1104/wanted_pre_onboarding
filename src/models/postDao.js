const { AppDataSource } = require("./dataSource");
const Post = require("../entities/Post");
const Company = require("../entities/Company")

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
            "posts.id AS postId",
            "posts.position AS position",
            "posts.compensation AS compensation",
            "posts.content AS content",
            "posts.technology_stack AS technologyStack",
            "companies.name AS companyName",
            "companies.location AS companyLocation",
            "companies.region AS companyRegion"
        ])
        .from(Post, "posts")
        .innerJoin(Company, "companies", "posts.company_id = companies.id")
        .execute()
}

module.exports = {
    postRegistration,
    postEdit,
    postDelete,
    getPost
}