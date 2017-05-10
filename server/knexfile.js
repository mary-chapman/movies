// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/my_movies'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?SSL=true'

  }

};
