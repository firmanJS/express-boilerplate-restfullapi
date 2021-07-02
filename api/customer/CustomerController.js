const options = { new: true }
const Customer = require('../../models/CustomerModel')
const {
  pages, save, readById, updated, deletes, objId, MONGO
} = require('../../utils')

const searching = (req) => {
  let namaKantor = { kantor: {} }
  let namaSearch = { pelanggan: {} }
  const search = {}

  if (req.query.namakantor) {
    namaKantor.kantor = { $elemMatch: { nama_kantor: req.query.namakantor } }
  } else {
    namaKantor = {}
  }

  if (req.query.nama) {
    namaSearch.pelanggan.nama = req.query.nama
  } else {
    namaSearch = {}
  }

  if (req.query.search) {
    search.name = new RegExp(req.query.search, 'i')
  }

  return {
    status: false,
    condition: { ...search, ...namaSearch, ...namaKantor }
  }
}

const index = (req, res) => pages(req, res, Customer, searching(req))
const store = (req, res) => save(req, res, Customer)
const show = (req, res) => readById(req, res, Customer)
const update = (req, res) => updated(req, res, Customer, MONGO.UPDATE_BY_ID, objId(req), options)
const destroy = (req, res) => deletes(req, res, Customer, req.params.id)

module.exports = {
  index, store, show, update, destroy
}
