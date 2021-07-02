const express = require('express')
const rateLimit = require('express-rate-limit')
const user = require('../api/user/UserController')
const { login, logout } = require('../api/user/AuthController')
const { inputValidationUser, schemas } = require('../api/user/validation')
const { verifyToken, joiResult } = require('../middleware')

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    code: 429,
    status: 'too many request',
    message: 'request ke endpoint ini dibatasi 3 kali dalam satu menit',
    data: []
  }
})

const router = express.Router()

router.get('/', verifyToken, limiter, user.index)
router.post('/', verifyToken, (req, res) => {
  user.store(inputValidationUser(req), res)
})
router.get('/:id', verifyToken, user.show)
router.put('/:id', verifyToken, user.update)
router.delete('/:id', verifyToken, user.destroy)

// authenticate route
router.post('/auth/login', joiResult(schemas.userLogin, 'body'), (req, res) => {
  login(req.body, res)
})
router.post('/auth/register', (req, res) => {
  user.store(inputValidationUser(req), res)
})
router.get('/auth/logout', verifyToken, logout)

module.exports = router
