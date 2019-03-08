exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    console.log("deleting cart_item");
    return knex('cart_item').del()
        .then(() => {
            console.log("deleting order");
            return knex('order').del()
                .then(() => {
                    console.log("deleting cart");
                    return knex('cart').del()
                })
                .then(() => {
                    console.log("deleting user");
                    return knex('user').del()
                        .then(() => {
                            console.log("deleting product");
                            return knex('product').del()
                                .then(() => {
                                    console.log("deleting category");
                                    return knex('category').del()

                                })
                        })
                })
        })
}