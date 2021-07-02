const Users = require('../../models/UserModel')
const BlackList = require('../../models/BlacklistModel')
const msg = require('../../utils')
const { verifyLoginPassword } = require('./validation')

const login = async (param, res) => {
  try {
    const check = await Users.findOne({ username: param.username })
    if (check) {
      const verify = verifyLoginPassword(param.password, check)
      msg.customResponse(res, verify.code, verify.msg, verify.data)
    } else {
      msg.customResponse(res, 401, 'Username or password not match', null)
    }
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const logout = async (req, res) => {
  try {
    // eslint-disable-next-line global-require
    const jwt = require('jsonwebtoken')
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.decode(token)
      await BlackList.create({ token, author: decoded.id })
      msg.customResponse(res, 200, 'Logout sucessfully', null)
    } else {
      msg.errorResponse(res, 'Headers not set or token is expired', 422)
    }
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

module.exports = {
  login, logout
}
