const express = require('express')

const routing = express()
const index = require('./DocumentationRoutes')
const user = require('./UserRoute')
const item = require('./ItemRoute')
const customer = require('./CustomerRoute')
const country = require('./CountryRoute')
const { API_PATH } = require('../utils')

routing.use(index)
routing.use(`${API_PATH}/user`, user)
routing.use(`${API_PATH}/item`, item)
routing.use(`${API_PATH}/customer`, customer)
routing.use(`${API_PATH}/country`, country)

module.exports = routing
