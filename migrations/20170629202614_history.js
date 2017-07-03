exports.up = function(knex) {
  return knex.schema.createTable('history', table => {
    table.increments();
    table.integer('user_id').references('users.id').notNullable();
    table.string('artist').notNullable();
    table.text('photo').notNullable().defaultTo('http://i.imgur.com/cswiXLl.jpg')
    table.string('score').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('history')
};
