const { AppDataSource } = require("./dataSource");
const Application = require("../entities/Application")

const applyJob = async (postId, userId) => {
    return await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(Application)
        .values({
            user_id: userId,
            post_id: postId
        })
        .execute()
}

const getApplicationDuplicate = async (postId, userId) => {
    return await AppDataSource
        .getRepository(Application)
        .createQueryBuilder("applications")
        .where("applications.user_id = :user AND applications.post_id = :post", { user: userId, post: postId })
        .getOne()
}

module.exports = {
    applyJob,
    getApplicationDuplicate
}
