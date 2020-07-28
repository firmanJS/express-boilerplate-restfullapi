'use strict'
const Users = require('../../models/UserModel')
const msg = require('../../helpers/exceptions')
const { _paging } = require('../../helpers/pagination')

const index = async (req, res) => {
  const paginate = _paging(req)
  try {
    const result = await Users.find(paginate.where)
      .skip((paginate.limit * paginate.page) - paginate.limit)
      .limit(paginate.limit).sort(paginate.sort)
    const count = await Users.estimatedDocumentCount()
    const countPerPage = Math.ceil(count / paginate.limit)
    const dataMapping = {
      result: result,
      page: paginate.page,
      countPerPage: countPerPage,
      count: count,
      limit: paginate.limit
    }
    msg.successResponse(req, res, dataMapping)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const store = async (res, input) => {
  try {
    const result = await Users.create(input)
    msg.createResponse(res, result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const show = async (req, res) => {
  try {
    const result = await Users.findById(req.params.id)
    msg.getResponse(res, result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const update = async (req, res) => {
  try {
    const result = await Users.findByIdAndUpdate(req.params.id,
      { $set: req.body }, { new: true })
    msg.updateResponse(res, result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

const destroy = async (req, res) => {
  try {
    const result = await Users.findByIdAndRemove(req.params.id)
    msg.deleteResponse(res, result)
  } catch (error) {
    msg.errorResponse(res, error, 500)
  }
}

module.exports = {
  index, store, show, update, destroy
}