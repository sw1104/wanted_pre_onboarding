const EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name: "Post",
    tableName: "posts",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        company_id: {
            type: "int"
        },
        position: {
            type: "varchar"
        },
        compensation: {
            type: "decimal"
        },
        content: {
            type: "text"
        },
        technology_stack: {
            type: "varchar"
        },
        created_at: {
            createDate: "true"
        },
        updated_at: {
            updateDate: "true"
        }
    },
    relations: {
        Company: {
            target: "companies",
            type: "many-to-one",
            joinColumn: {
                name: "company_id"
            },
            cascade: true
        }
    }
});