'use strict'
const notFoundHandler = (req, res) => {
  const err = new Error('Not Found')
  return res.status(404).json({
    error: err.stack,
    status: 404,
    msg: `Route : ${req.url} Not found.`
  })
}

const errorHandler = (error, req, res, next) => {
  if (!error.statusCode) error.statusCode = 500
  return res.status(error.statusCode).json({
    error: error,
    status: error.statusCode,
    msg: error.toString()
  })
}

const successResponse = (req, res, data) => {
  return res.status(200).json({
    code: 200,
    message: 'Get data successfull',
    status: 'success',
    data: data.result,
    _links: req.url,
    _meta: {
      currentPage: 1,
      page: data.page,
      limitPerPage: data.limit,
      totalPages: data.countPerPage,
      countPerPage: data.result.length,
      countTotal: data.count
    }
  })
}

const createResponse = (res, data) => {
  return res.status(200).json({
    code: 200,
    message: 'Create data successfull',
    status: 'success',
    data: data
  })
}

const getResponse = (res, data) => {
  return res.status(200).json({
    code: 200,
    message: 'Get detail data successfull',
    status: 'success',
    data: data
  })
}

const updateResponse = (res, data) => {
  return res.status(200).json({
    code: 200,
    message: 'Update data successfull',
    status: 'success',
    data: data
  })
}

const deleteResponse = (res, data) => {
  return res.status(200).json({
    code: 200,
    message: 'Delete data successfull',
    status: 'success',
    data: data
  })
}

const customResponse = (res, code, msg, data) => {
  return res.status(code).json({
    code: code,
    message: msg,
    data: data
  })
}

const notFoundResponse = (res) => {
  return res.status(404).json({
    code: 404,
    message: 'Content not found',
    status: 'empty',
    data: []
  })
}

const errorResponse = (res, msg, code) => {
  return res.status(code).json({
    message: `Error. ${msg}`,
    status: 'bad request',
    data: []
  })
}

module.exports = {
  notFoundHandler,
  errorHandler,
  successResponse,
  createResponse,
  getResponse,
  updateResponse,
  deleteResponse,
  notFoundResponse,
  errorResponse,
  customResponse
}