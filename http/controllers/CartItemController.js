const CartItem = new (require("../../models/Good.js"))();
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
        if (req.authData.role != "manager" || req.authData.role != "seller" || req.authData.role != "admin") {
            return res.status(403).json({
                error: true,
                message: "Permission denied"
            })
        }

        let result = CartItem.create({
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            pic: req.body.pic
        })
        res.send(result)
    }
    update(req, res) {
        if (!req.body) return res.sendStatus(400);
        if (req.authData.role != "manager" || req.authData.role != "seller" || req.authData.role != "admin") {
            return res.status(403).json({
                error: true,
                message: "Permission denied"
            })
        }

        let result = CartItem.update(req.params.goodId, {
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            pic: req.body.pic
        })
        res.send(result)
    }
    delete(req, res) {
        if (req.authData.role != "manager" || req.authData.role != "seller" || req.authData.role != "admin") {
            return res.status(403).json({
                error: true,
                message: "Permission denied"
            })
        }

        let result = CartItem.delete(req.params.goodId);
        res.send(result)
    }
}