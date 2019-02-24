exports.seed = function (knex, Promise) {

  // Inserts seed entries
  return knex('order').insert([{
      id: 1,
      user_id: 1,
      cart_id: 1,
      city: "חיפה",
      street: "יאנוש קורצ'ק",
      last_four: "1234"
    }])
    .catch((err) => {
      console.log('ORDER : ', err.sqlMessage);
      return err;
    });

};