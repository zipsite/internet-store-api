const Review = new (require("../../models/Review.js"))();
module.exports = class ReviewController {
    index(req, res) {
        let result = Review.all();
        res.send(result)
    }
    show(req, res) {
        let result = Review.find(req.params.id)
        res.send(result)

    }
    store(req, res) {
        if (!req.body) return res.sendStatus(400);
        if (req.authData.role != "admin") {
            return res.status(403).json({
                error: true,
                message: "Permission denied"
            })
        }

        let result = Review.create({
            userId: req.body.userId,
            goodId: req.body.goodId,
            rating: req.body.rating,
            name: req.body.name,
            description: req.body.description
        })
        res.send(result)
    }
    update(req, res) {
        if (!req.body) return res.sendStatus(400);
        if (req.authData.role != "admin") {
            return res.status(403).json({
                error: true,
                message: "Permission denied"
            })
        }

        let result = Review.update(req.params.id, {
            userId: req.body.userId,
            goodId: req.body.goodId,
            rating: req.body.rating,
            name: req.body.name,
            description: req.body.description
        })
        res.send(result)
    }
    delete(req, res) {
        if (req.authData.role != "admin") {
            return res.status(403).json({
                error: true,
                message: "Permission denied"
            })
        }

        let result = Review.delete(req.params.id);
        res.send(result)
    }
}