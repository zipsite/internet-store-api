const Model = require("./Model.js")
module.exports = class Good extends Model {
    struct = {
        name: {
            type: "string",
            default: ""
        },
        description: {
            type: "string",
            default: ""
        },
        cost: {
            type: "number",
            default: 0
        },
        pic: {
            type: "string",
            default: ""
        }
    }
}