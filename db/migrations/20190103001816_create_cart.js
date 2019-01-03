exports.up = function (knex, Promise) {
    return knex.schema.createTable('cart_item', function (table) {
        table.increments();
        table.integer('product_id').references('id').inTable('product');
        table.integer('amount').defaultTo(0);
        table.decimal('total', 10, 2).defaultTo(0.00);
        table.integer('cart_id').references('is').inTable('cart');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cart_item');
};