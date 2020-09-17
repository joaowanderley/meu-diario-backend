exports.up = function (knex) {
  return knex.schema.createTable('anotations', function (t) {
    t.string('id');
    t.string('uid').primary();
    t.string('text').notNullable();

    t.string('user_id').notNullable();
    t.foreign('user_id').references('id').inTable('users')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('anotations')
};
