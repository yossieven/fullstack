exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('category').del()
    .then(function () {
      // Inserts seed entries
      return knex('category').insert([{
          id: 1,
          name: 'מוצרי חלב'
        },
        {
          id: 2,
          name: 'פירות וירקות'
        },
        {
          id: 3,
          name: 'בשר ודגים'
        },
        {
          id: 4,
          name: 'יין ומשקאות'
        }
      ]);
    });
};