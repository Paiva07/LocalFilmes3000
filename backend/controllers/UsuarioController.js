const dbKnex = require('../data/db_config');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async index(req, res) {
    try {
      const usuarios = await dbKnex('usuarios');
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  async store(req, res) {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      res.status(400).json({ msg: 'Enviar dados completos' });
      return;
    }
    try {
      const novo = await dbKnex('usuarios').insert({ nome, email, senha });

      res.status(201).json({ novo, token: generateToken({ id: novo[0].id }) });
    } catch (error) {
      res.status(400).json({ msg: 'Email já cadastrado' });
    }
  },

  async login(req, res) {
    const { email, senha } = req.body;
    if (!email || !senha) {
      res.status(400).json({ msg: 'Enviar dados completos' });
      return;
    }
    try {
      const dados = await dbKnex('usuarios').where({ email });
      if (dados.length == 0) {
        res.status(400).json({ msg: 'Email não cadastrado' });

        return;
      }
      if (dados[0].senha == senha) {
        dados[0].senha = undefined; // Não retorna a senha no Json
        res
          .status(200)
          .json({ dados, token: generateToken({ id: dados[0].id }) });
      } else {
        res.status(400).json({ msg: 'Senha Incorreta' });
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};
