const Model = require("./Model.js")
module.exports = class User extends Model {
    struct = {
        name: {
            type: "string",
        },
        email: {
            type: "string"
        },
        phone: {
            type: "string"
        },
        role: {
            type: "string",
            enum: ["buyer", "manager", "seller", "admin"]
        },
        password: {
            type: "string"
        },
        deleteIS: {
            type: "string"
        }
    }
}