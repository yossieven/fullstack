exports.seed = function (knex, Promise) {

  // Inserts seed entries
  return knex('user').insert([{
      id: 1,
      name: 'יוסי',
      last_name: 'אבן',
      email: 'yossi.even@gmail.com',
      password: 'q1w2e3r4',
      city: 'נהרייה',
      street: 'שקד',
      role: 0
    }])
    .catch((err) => {
      console.log('USER : ', err.sqlMessage);
      return err;
    });

};