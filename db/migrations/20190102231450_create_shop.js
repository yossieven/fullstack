exports.up = function (knex, Promise) {
    return knex.schema.createTable('product', function (table) {
            table.increments('id');
            table.string('name');
            table.integer('category');
            table.decimal('price', 10, 2);
            table.text('image');
        })
        .createTable('user', function (table) {
            table.increments('id');
            table.string('name').notNullable();
            table.string('last_name').notNullable();
            table.string('email').notNullable();
            table.string('password');
            table.string('city');
            table.string('street');
            table.integer('role');
        })
        .createTable('cart', function (table) {
            table.increments('id');
            table.integer('user_id').references('id').inTable('user');
            table.timestamp('creation_date').defaultTo(knex.fn.now());
        })
        .createTable('cart_item', function (table) {
            table.increments('id');
            table.integer('product_id').references('id').inTable('product');
            table.integer('amount').defaultTo(0);
            table.decimal('total', 10, 2).defaultTo(0.00);
            table.integer('cart_id').references('is').inTable('cart');
        })
        .createTable('category', (table) => {
            table.increments('id');
            table.string('name').notNullable();

        });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('product')
        .dropTable('user')
        .dropTable('cart')
        .dropTable('cart_item')
        .dropTable('category');
};