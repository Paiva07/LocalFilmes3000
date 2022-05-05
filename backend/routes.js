const express = require('express');
const routes = express.Router();
const authMiddleware = require('./middlewares/auth.js');

const UsuarioController = require('./controllers/UsuarioController');
const FilmesController = require('./controllers/FilmesController');

routes
  .get('/usuarios', UsuarioController.index)
  .post('/usuarios', UsuarioController.store)
  .post('/login', UsuarioController.login)
  .use(authMiddleware)
  .get('/filmes', FilmesController.index)
  .get('/filmes/:id', FilmesController.indexFilm)
  .post('/filmes', FilmesController.store)
  .put('/filmes/:id', FilmesController.update)
  .delete('/filmes/:id', FilmesController.delete);

module.exports = routes;
