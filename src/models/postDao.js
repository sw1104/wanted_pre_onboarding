const { AppDataSource } = require("./dataSource");
const Post = require("../entities/Post");

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

module.exports = {
    postRegistration
}