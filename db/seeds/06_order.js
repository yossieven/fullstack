exports.seed = function (knex, Promise) {
  console.log("ORDER seed");
  // Inserts seed entries
  return knex('order').insert([{
        id: 1,
        user_id: '1',
        cart_id: 1,
        city: "חיפה",
        street: "יאנוש קורצ'ק",
        last_four: "1234"
      },
      {
        id: 2,
        user_id: '2',
        cart_id: 1,
        city: "נהרייה",
        street: "שקד",
        last_four: "3333"
      }
    ])
    .catch((err) => {
      console.log('ORDER : ', err.sqlMessage);
      return err;
    });

};