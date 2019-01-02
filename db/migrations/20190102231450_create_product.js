exports.up = function (knex, Promise) {
    return knex.schema.createTable('product', function (table) {
        table.increments();
        table.string('name');
        table.integer('category');
        table.decimal('price', 10, 2);
        table.text('image');
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('product')
};