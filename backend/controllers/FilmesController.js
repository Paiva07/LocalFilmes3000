const express = require('express');
const routes = express.Router();
const dbKnex = require('../data/db_config');

module.exports = {
  async index(req, res) {
    try {
      const filmes = await dbKnex('filmes');
      res.status(200).json(filmes);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async indexFilm(req, res) {
    const id = req.params.id;
    try {
      const filmes = await dbKnex('filmes').where('id', id);
      res.status(200).json(filmes);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async store(req, res) {
    const { nome, genero, foto, duracao } = req.body;
    if (!nome || !genero || !foto || !duracao) {
      res.status(400).json({ msg: 'Enviar dados completos' });
      return;
    }
    try {
      const novo = await dbKnex('filmes').insert({
        nome,
        genero,
        foto,
        duracao,
      });

      res.status(201).json({ id: novo[0] });
    } catch (error) {
      res.status(400).json({ msg: 'Email já cadastrado' });
    }
  },
  async update(req, res) {
    const id = req.params.id;
    const { nome, genero, foto, duracao } = req.body;
    try {
      await dbKnex('filmes')
        .update({ nome, genero, foto, duracao })
        .where('id', id);
      res.status(200).json();
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  async delete(req, res) {
    const id = req.params.id;
    try {
      await dbKnex('filmes').del().where('id', id);
      res.status(200).json();
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};
