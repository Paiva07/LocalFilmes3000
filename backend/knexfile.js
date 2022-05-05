module.exports = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './data/Films.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
