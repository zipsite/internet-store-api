const express = require('express')
const router = express.Router()
const BookController = new (require('../http/controllers/BookController.js'))()
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
    router.use(auth)
    router.get('/book', BookController.index)
    router.get('/book/:bookId', BookController.show)
    router.post('/book', BookController.store)
    router.put('/book/:bookId', BookController.update)
    router.delete('/book/:bookId', BookController.delete)
    return router
})())

module.exports = router
