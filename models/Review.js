const Model = require("./Model.js")
module.exports = class Review extends Model {
    struct = {
        userId: {
            type: "number",
        },
        goodId: {
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