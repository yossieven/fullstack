exports.seed = function (knex, Promise) {
  console.log("CATEGORY seed");
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
  ]).catch((err) => {
    console.log('CATEGORY: ', err.sqlMessage);
    return err;
  })
};