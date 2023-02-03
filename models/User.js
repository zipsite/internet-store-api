const Model = require("./Model.js")
module.exports = class User extends Model {
    struct = {
        name: {
            type: "string",
        },
        email: {
            type: "string"
        },
        role: {
            type: "string",
            enum: ["user", "admin"]
        },
        password: {
            type: "string"
        }
    }
}