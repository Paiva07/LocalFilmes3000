exports.up = function (knex) {
  return knex.schema.createTable('filmes', (table) => {
    table.increments();
    table.string('nome', 80).notNullable();
    table.string('genero', 80).notNullable();
    table.string('foto', 100).notNullable();
    table.string('duracao', 80).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('filmes');
};
