exports.seed = function (knex, Promise) {
  console.log("USER insert seed");
  // Inserts seed entries
  return knex('user').insert([{
      id: '1',
      name: 'יוסי',
      last_name: 'אבן',
      email: 'yossi.even@gmail.com',
      password: 'q1w2e3r4',
      city: 'נהרייה',
      street: 'שקד',
      role: 0
    }, {
      id: '2',
      name: 'יוסי',
      last_name: 'אבן',
      email: 'yossi.even@hotmail.com',
      password: 'Wonder11!',
      city: 'ירושליים',
      street: 'שקד',
      role: 1
    }])
    .catch((err) => {
      console.log('USER : ', err.sqlMessage);
      return err;
    });

};