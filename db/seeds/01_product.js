exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('product').del()
    .then(function () {
      // Inserts seed entries
      return knex('product').insert([{
          id: 1,
          name: 'חלב בקרטון 3% שופרסל',
          category: 'מוצרי חלב',
          price: 5.30,
          image: 'z_7296073231554.PNG'
        },
        {
          id: 2,
          name: 'חלב 1% בקרטון שופרסל',
          category: 'מוצרי חלב',
          price: 5.30,
          image: 'z_7296073231547.PNG'
        }
      ]);
    });
};