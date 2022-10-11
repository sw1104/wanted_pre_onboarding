const { DataSource } = require("typeorm");
const Application = require("../entities/Application");
const Company = require("../entities/Company");
const Post = require("../entities/Post");
const User = require("../entities/User");

const AppDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [User, Company, Post, Application],
    synchronize: false,
    logging: true
});

module.exports = {
    AppDataSource
};