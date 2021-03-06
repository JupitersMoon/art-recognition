// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/artrec'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/artrec'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
