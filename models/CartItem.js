const Model = require("./Model.js")
module.exports = class CartItem extends Model {
    struct = {
        id_user: {
            type: "number",
            default: 0
        },
        id_good: {
            type: "number",
            default: 0
        },
        amount: {
            type: "number",
            default: 1
        }
    }
}