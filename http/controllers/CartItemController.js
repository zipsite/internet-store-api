const CartItem = new (require("../../models/CartItem.js"))();
module.exports = class CartItemController {
    index(req, res) {
        let result = CartItem.all();
        res.send(result)
    }
    show(req, res) {
        let result = CartItem.find(req.params.id)
        res.send(result)
    }
    store(req, res) {
        if (!req.body) return res.sendStatus(400);

        let result = CartItem.create({
            userId: req.authData.id,
            goodId: req.body.goodId,
            amount: req.body.amount,
        })
        res.send(result)
    }
    update(req, res) {
        if (!req.body) return res.sendStatus(400);

        let result = CartItem.update(req.params.id, {
            userId: req.authData.id,
            goodId: req.body.goodId,
            amount: req.body.amount,
        })
        res.send(result)
    }
    delete(req, res) {

        let result = CartItem.delete(req.params.id);
        res.send(result)
    }
}