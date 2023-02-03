const Model = require("./Model.js")
module.exports = class Book extends Model {
    struct = {
        name: {
            type: "string",
            default: ""
        },
        author: {
            type: "string",
            default: ""
        },
        year: {
            type: "string",
            default: ""
        }
    }
}