const { validationResult } = require('express-validator')
const { getResponse, notFoundResponse } = require('./index')

const resultValidation = (request) => {
  const errValidation = validationResult(request)
  if (!errValidation.isEmpty()) {
    return errValidation
  }
  return 0
}

const countValidation = (req, res, data) => {
  let response
  if (data.count > 0) {
    response = getResponse(req, res, data)
  } else {
    response = notFoundResponse(res)
  }

  return response
}

module.exports = {
  resultValidation, countValidation
}
