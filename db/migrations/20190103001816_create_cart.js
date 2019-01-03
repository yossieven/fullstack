exports.up = function (knex, Promise) {
    return knex.schema.createTable('cart', function (table) {
        table.increments('id');
        table.integer('user_id').references('id').inTable('user');
        table.timestamp('creation_date').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cart');
};