const express = require('express')
const routes = express.Router()

const authclt = require('../controller/authcontroller')

routes.post('/signup',authclt.signup)

routes.post('/signin',authclt.signin)


module.exports = routes