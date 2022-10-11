const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Company",
    tableName: "companies",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar"
        },
        location: {
            type: "varchar"
        },
        region: {
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