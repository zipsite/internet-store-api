const express = require('express')
const router = express.Router()
// const BookController = new (require('../http/controllers/BookController.js'))()
const GoodController = new (require('../http/controllers/GoodController.js'))()
const CartItemController = new (require('../http/controllers/CartItemController.js'))()
const ReviewController = new (require('../http/controllers/ReviewController.js'))()
const AuthController = new (require('../http/controllers/AuthController.js'))()
const auth = require("../http/middleware/auth.js")


router.use('/auth', (() => {
    const router = express.Router()
    router.post('/signup', AuthController.signup)
    router.post('/login', AuthController.login)
    router.post('/logout', AuthController.logout)
    router.post('/refresh', AuthController.refresh)
    router.post('/me', AuthController.me)
    return router
})())

router.use((() => {
    const router = express.Router()

    router.get('/good', GoodController.index)
    router.get('/good/:id', GoodController.show)
    router.use(auth);
    router.post('/good', GoodController.store)
    router.put('/good/:id', GoodController.update)
    router.delete('/good/:id', GoodController.delete)
    return router
})())

router.use((() => {
    const router = express.Router()
    router.use(auth);
    router.get('/cartitem', CartItemController.index)
    router.get('/cartitem/:id', CartItemController.show)
    router.post('/cartitem', CartItemController.store)
    router.put('/cartitem/:id', CartItemController.update)
    router.delete('/cartitem/:id', CartItemController.delete)
    return router
})())

router.use((() => {
    const router = express.Router()
    router.use(auth);
    router.get('/review', ReviewController.index)
    router.get('/review/:id', ReviewController.show)
    router.post('/review', ReviewController.store)
    router.put('/review/:id', ReviewController.update)
    router.delete('/review/:id', ReviewController.delete)
    return router
})())

router.use((() => {
    const router = express.Router()
    router.use(auth)
    // router.get('/book', BookController.index)
    // router.get('/book/:bookId', BookController.show)
    // router.post('/book', BookController.store)
    // router.put('/book/:bookId', BookController.update)
    // router.delete('/book/:bookId', BookController.delete)
    return router
})())

module.exports = router
