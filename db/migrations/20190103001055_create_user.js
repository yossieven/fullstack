exports.up = function (knex, Promise) {
    return knex.schema.createTable('user', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').notNullable();
        table.string('password');
        table.string('city');
        table.string('street');
        table.integer('role');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('user');
};