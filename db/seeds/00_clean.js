exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('cart_item').del()
        .then(() => {
            return knex('cart').del()
                .then(() => {
                    return knex('user').del()
                        .then(() => {
                            return knex('product').del()
                                .then(() => {
                                    return knex('category').del()
                                        .then(() => {
                                            return knex('order').del()
                                        })
                                })
                        })
                })
        })
}