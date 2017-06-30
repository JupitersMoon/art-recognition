exports.up = function(knex) {
  return knex.schema.createTable('history', table => {
    table.increments();
    table.integer('tag_id').notNullable();
    table.integer('user_id').references('users.id').notNullable();
    table.timestamps(true,true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('history')
};
