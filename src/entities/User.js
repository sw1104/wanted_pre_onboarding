const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar"
        },
        created_at: {
            createDate: "true"
        },
        updated_at: {
            updateDate: "true"
        }
    }
});