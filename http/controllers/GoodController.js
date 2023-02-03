const Good = new (require("../../models/Good.js"))();
module.exports = class GoodController {
    index(req, res) {
        let result = Good.all();
        res.send(result)
    }
    show(req, res) {
        let result = Good.find(req.params.goodId)
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

        let result = Good.create({
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

        let result = Good.update(req.params.goodId, {
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

        let result = Good.delete(req.params.goodId);
        res.send(result)
    }
}