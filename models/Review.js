const Model = require("./Model.js")
module.exports = class Review extends Model {
    struct = {
        id_user: {
            type: "number",
        },
        id_good: {
            type: "number",
        },
        rating: {
            type: "number",
        },
        name: {
            type: "string",
        },
        description: {
            type: "string",
        },
    }
}