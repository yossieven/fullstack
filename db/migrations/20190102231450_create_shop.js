exports.up = function (knex, Promise) {
    console.log("running latest...");
    return knex.schema.hasTable('category').then((exists) => {
        console.log('does knex have category table?', exists);
        if (!exists) {
            return knex.schema.createTable('category', (table) => {
                table.increments();
                table.string('name').notNullable();

            });
        }
    }).then(() => {
        return knex.schema.hasTable('product').then((exists) => {
            console.log('does knex have product table?', exists);
            if (!exists) {
                return knex.schema.createTable('product', function (table) {
                    table.increments();
                    table.string('name');
                    table.integer('category').unsigned();
                    table.decimal('price', 10, 2);
                    table.text('image');
                    table.foreign('category').references('id').inTable('category');
                });
            }
        })
    }).then(() => {
        return knex.schema.hasTable('user').then((exists) => {
            console.log('does knex have user table?', exists);
            if (!exists) {
                return knex.schema.createTable('user', function (table) {
                    table.increments();
                    table.string('name').notNullable();
                    table.string('last_name').notNullable();
                    table.string('email').notNullable();
                    table.string('password');
                    table.string('city');
                    table.string('street');
                    table.integer('role');
                });
            }
        });
    }).then(() => {
        return knex.schema.hasTable('cart').then((exists) => {
            console.log('does knex have cart table?', exists);
            if (!exists) {
                return knex.schema.createTable('cart', function (table) {
                    table.increments();
                    table.integer('user_id').unsigned();
                    table.timestamp('creation_date').defaultTo(knex.fn.now());
                    table.foreign('user_id').references('id').inTable('user');
                });
            }
        });
    }).then(() => {
        return knex.schema.hasTable('cart_item').then((exists) => {
            console.log('does knex have cart_item table?', exists);
            if (!exists) {
                return knex.schema.createTable('cart_item', function (table) {
                    table.increments();
                    table.integer('product_id').unsigned();
                    table.integer('amount').defaultTo(0)
                    table.decimal('total', 10, 2).defaultTo(0.00);
                    table.integer('cart_id').unsigned();
                    table.foreign('product_id').references('id').inTable('product');
                    table.foreign('cart_id').references('id').inTable('cart');
                });
            }
        });
    }).then(() => {
        return knex.schema.hasTable('order').then((exists) => {
            console.log('does knex have order table?', exists);
            if (!exists) {
                return knex.schema.createTable('order', function (table) {
                    table.increments();
                    table.integer('user_id').unsigned();
                    table.foreign('user_id').references('id').inTable('user');
                    table.decimal('total', 10, 2).defaultTo(0.00);
                    table.integer('cart_id').unsigned();
                    table.foreign('cart_id').references('id').inTable('cart');
                    table.string('city');
                    table.string('street');
                    table.timestamp('shipping_date');
                    table.timestamp('creation_date').defaultTo(knex.fn.now());
                    table.string('last_four');
                });
            }
        });
    })
}


exports.down = function (knex, Promise) {
    return knex.schema.dropTable('cart_item')
        .dropTable('product')
        .dropTable('category')
        .dropTable('order')
        .dropTable('cart')
        .dropTable('user');



};