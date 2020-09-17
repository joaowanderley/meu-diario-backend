
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.string('id').primary();   
    t.string('name').notNullable();
    t.string('email').unique().notNullable();
    t.string('password').notNullable();
  })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
