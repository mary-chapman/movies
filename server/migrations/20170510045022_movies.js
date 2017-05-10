
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', (table) => {
    table.increments();
    table.text('title').notNullable();
    table.integer('rating').notNullable();
    table.text('description');
    table.boolean('watched').defaultTo(false).notNullable();
  })
};

exports.down = function(knex, Promise) {
  return kinex.schema.dropTable('movies');
};
