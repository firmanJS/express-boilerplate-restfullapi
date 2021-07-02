const options = { new: true }
const Items = require('../../models/CountryModel')
const {
  SEARCH, MONGO, pages, save, readById, updated, deletes, objId
} = require('../../utils')

const index = (req, res) => pages(req, res, Items, SEARCH)
const store = (req, res) => save(req, res, Items)
const show = (req, res) => readById(req, res, Items)
const update = (req, res) => updated(req, res, Items, MONGO.UPDATE_BY_ID, objId(req), options)
const destroy = (req, res) => deletes(req, res, Items, req.params.id)

module.exports = {
  index, store, show, update, destroy
}
