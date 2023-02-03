const Model = require("./Model.js")
module.exports = class CartItem extends Model {
    struct = {
        userId: {
            type: "number",
            default: 0
        },
        goodId: {
            type: "number",
            default: 0
        },
        amount: {
            type: "number",
            default: 1
        }
    }
}