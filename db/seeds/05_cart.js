exports.seed = function (knex, Promise) {
  console.log("CART seed");
  // Inserts seed entries
  return knex('cart').insert([{
      id: 1,
      user_id: 1
    }])
    .catch((err) => {
      console.log('CART : ', err.sqlMessage);
      return err;
    });

};