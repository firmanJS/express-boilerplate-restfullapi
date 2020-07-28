'use strict'
const express = require('express')
const user = require('../controllers/user/UserController')
const auth = require('../controllers/user/AuthController')
const { validationResult } = require('express-validator')
const { inputValidationUser, loginValidation } = require('../controllers/user/validation')
const { API_PATH } = require('../helpers/constant')
const { verifyToken } = require('../helpers/token_validation')
const router = express.Router()

router.get(`${API_PATH}/user`, verifyToken, user.index)
router.post(`${API_PATH}/user`, verifyToken, (req, res) => {
  user.store(res, inputValidationUser(req))
})
router.get(`${API_PATH}/user/:id`, verifyToken, user.show)
router.put(`${API_PATH}/user/:id`, verifyToken, user.update)
router.delete(`${API_PATH}/user/:id`, verifyToken, user.destroy)

// authenticate route
router.post(`${API_PATH}/user/login`, [loginValidation], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) res.status(422).json(errors)
  auth.login(req.body, res)
})

module.exports = router