const options = { new: true }
const Country = require('../../models/CountryModel')
const {
  SEARCH, MONGO, pages, save, readById, updated, deletes, cleanAll, objId
} = require('../../utils')

const index = (req, res) => pages(req, res, Country, SEARCH)
const store = (req, res) => save(req, res, Country)
const show = (req, res) => readById(req, res, Country)
const update = (req, res) => updated(req, res, Country, MONGO.UPDATE_BY_ID, objId(req), options)
const destroy = (req, res) => deletes(res, res, Country, req.params.id)
const clean = (req, res) => cleanAll(req, res, Country)

module.exports = {
  index, store, show, update, destroy, clean
}
