const Model = require("./Model.js")
module.exports = class UserToken extends Model {
    struct = {
        userId: {
            type: "string",
        },
        token: {
            type: "string"
        },
        created: {
            type: "string"
        }
    }
}