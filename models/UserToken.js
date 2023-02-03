const Model = require("./Model.js")
module.exports = class UserToken extends Model {
    struct = {
        userId: {
            type: "number",
        },
        token: {
            type: "string"
        },
    }
}