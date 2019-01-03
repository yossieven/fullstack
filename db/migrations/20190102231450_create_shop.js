exports.up = function (knex, Promise) {
    return knex.schema.createTable('product', function (table) {
            table.increments();
            table.string('name');
            table.integer('category');
            table.decimal('price', 10, 2);
            table.text('image');
        })
        .createTable('user', function (table) {
            table.increments();
            table.string('name').notNullable();
            table.string('last_name').notNullable();
            table.string('email').notNullable();
            table.string('password');
            table.string('city');
            table.string('street');
            table.integer('role');
        })
        .createTable('cart', function (table) {
            table.increments();
            table.integer('user_id').unsigned();
            table.timestamp('creation_date').defaultTo(knex.fn.now());
            table.foreign('user_id').references('id').inTable('user');
        })
        .createTable('cart_item', function (table) {
            table.increments();
            table.integer('product_id').unsigned();
            table.integer('amount').defaultTo(0);
            table.decimal('total', 10, 2).defaultTo(0.00);
            table.integer('cart_id').unsigned();
            table.foreign('product_id').references('id').inTable('product');
            table.foreign('cart_id').references('id').inTable('cart');
        })
        .createTable('category', (table) => {
            table.increments();
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