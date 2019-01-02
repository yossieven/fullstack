exports.up = function (knex, Promise) {
    table.increments();
    table.integer('user_id').references('id').inTable('user');
    table.timestamp('creation_date').defaultTo(knex.fn.now());
};

exports.down = function (knex, Promise) {

};