exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('user').del()
        .then(() => {
            return knex('product').del()
                .then(() => {
                    return knex('category').del();
                })
        });
}