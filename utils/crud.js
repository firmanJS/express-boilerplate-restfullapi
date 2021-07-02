const mongoose = require('mongoose')
const {
  errorResponse, successResponse, paging, validateData, resultValidation, countValidation
} = require('./index')

const searchCondition = (req, search) => {
  const paginations = paging(req)
  let searching
  if (search.status) {
    searching = paginations.search
  } else {
    searching = search.condition
  }

  return searching
}

const pages = async (req, res, schema, search, select = [], indexing = {}) => {
  const paginations = paging(req)
  const searching = searchCondition(req, search) || [{}]
  try {
    const result = await schema.find(paginations.where)
      .select(select).or(searching)
      .sort(paginations.sort)
      .limit(paginations.limit)
      .skip((paginations.limit * paginations.page) - paginations.limit)
      .lean()
      .hint(indexing)
    const filterCount = { ...paginations.where, ...{ $or: [searching] } }
    const count = await schema.countDocuments(filterCount)
    const countPerPage = Math.ceil(count / paginations.limit)
    const dataMapping = {
      result,
      page: paginations.page,
      countPerPage,
      count,
      limit: paginations.limit
    }
    countValidation(req, res, dataMapping)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

const save = async (req, res, schema) => {
  try {
    const { body } = req
    const storeData = await schema.create(body)
    successResponse(res, 'Create', storeData)
  } catch (error) {
    const cek = resultValidation(req)
    if (cek) {
      errorResponse(res, cek, 500)
    } else {
      errorResponse(res, error, 500)
    }
  }
}

const readById = async (req, res, schema) => {
  try {
    const { id } = req.params
    const showData = await schema.findById(id).lean()
    validateData(req, res, 'Get', showData)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

const read = async (req, res, schema, where) => {
  try {
    const showData = await schema.find(where).lean()
    validateData(req, res, 'Get', showData)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

const updated = async (req, res, schema, method, where, options) => {
  const { body } = req
  try {
    const updatedData = await schema[method](where, { $set: body }, options)
    validateData(req, res, 'Update', updatedData)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

const deletes = async (req, res, schema, id) => {
  try {
    const destroyItem = await schema.findByIdAndRemove(id)
    validateData(req, res, 'Delete', destroyItem)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

const cleanAll = async (res, schema) => {
  try {
    const cleaning = await schema.deleteMany({})
    successResponse(res, 'Delete All', cleaning)
  } catch (error) {
    errorResponse(res, error, 500)
  }
}

const objId = (req) => ({ _id: mongoose.ObjectId(req.params.id) })

module.exports = {
  pages, save, read, deletes, cleanAll, updated, readById, objId
}
