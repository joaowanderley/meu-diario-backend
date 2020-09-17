const express = require('express');
const UserController = require('./controllers/UserController')
const SessionController = require('./controllers/SessionControler');
const AnotationController = require('./controllers/AnotationController');
const auth = require('./config/middleware/auth')

const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Meu diario!');
})

routes.get('/users', UserController.index)
routes.post('/users', UserController.create)
routes.post('/auth', SessionController.create)
routes.post('/anotation', auth, AnotationController.create)
routes.get('/anotations', auth, AnotationController.index)
routes.get('/anotations/:uid', auth, AnotationController.search)
routes.delete('/anotations/:uid', auth, AnotationController.delete)
routes.post('/anotations/:uid', auth, AnotationController.update)

module.exports = routes;