exports.up = function (knex, Promise) {
    return knex.schema.createTable('category', (table) => {
        table.increments('id');
        table.string('name').notNullable();

    })
};

exports.down = function (knex, Promise) {
    knex.schema.dropTable('category');
};