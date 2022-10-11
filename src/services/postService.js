const postDao = require("../models/postDao");

const postRegistration = async (companyId, position, compensation, content, technologyStack) => {
    return await postDao.postRegistration(companyId, position, compensation, content, technologyStack);
}

module.exports = {
    postRegistration,
}