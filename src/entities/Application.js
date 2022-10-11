const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Application",
    tableName: "applications",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        user_id: {
            type: "int"
        },
        post_id: {
            type: "int"
        },
        created_at: {
            createDate: "true"
        },
        updated_at: {
            updateDate: "true"
        }
    },
    relations: {
        User: {
            target: "users",
            type: "many-to-one",
            joinColumn: {
                name: "user_id"
            },
            cascade: true
        },
        Post: {
            target: 'posts',
            type: 'many-to-one',
            joinColumn: {
                name: 'post_id',
            },
            cascade: true
        },
    },
    uniques: [
        {
            name: "ApplicationUniques",
            columns: ["user_id", "post_id"],
        },
    ],
});