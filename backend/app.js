const express = require('express');
var cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
const routes = require('./routes');

app.use(express.json());

app.use(routes);

app.get('/', (req, res) => {
  res.send('Local Films 3000');
});

app.listen(port, () => {
  console.log(`Servidor em execução na porta: ${port}`);
});
