exports.seed = function (knex, Promise) {
  console.log("CATEGORY seed");
  // Inserts seed entries
  return knex('category').insert([{
      id: 1,
      name: 'כל המוצרים'
    },
    {
      id: 2,
      name: 'מוצרי חלב'
    },
    {
      id: 3,
      name: 'פירות וירקות'
    },
    {
      id: 4,
      name: 'בשר ודגים'
    },
    {
      id: 5,
      name: 'יין ומשקאות'
    }
  ]).catch((err) => {
    console.log('CATEGORY: ', err.sqlMessage);
    return err;
  })
};